<?php

declare(strict_types=1);

namespace App\Controller;

use Psr\Http\Message\ResponseInterface;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;
use PokePHP\PokeApi;
use Hyperf\Coroutine\WaitGroup;
use Swoole\Coroutine;

class IndexController extends AbstractController
{
    public function index(HttpResponse $response): ResponseInterface
    {
        $api = new PokeApi();

        // Pega a quantidade total de Pokémon
        $initialResponse = json_decode($api->resourceList('pokemon', 1, 0), true);
        $totalPokemon = $initialResponse['count'] ?? 0;

        if ($totalPokemon === 0) {
            return $response->json(['error' => 'No Pokémon data available'], 500);
        }

        $wg = new WaitGroup();
        $randomPokemon = [];
        $randomIds = array_map(fn() => rand(1, $totalPokemon), range(1, 5)); // Sortear 5 IDs aleatórios

        // Adicionar 5 ao contador do WaitGroup para as 5 corrotinas
        $wg->add(count($randomIds));

        // Buscar detalhes dos Pokémon em paralelo
        foreach ($randomIds as $id) {
            Coroutine::create(function () use ($wg, $api, $id, &$randomPokemon) {
                try {
                    // Busca os detalhes do Pokémon
                    $pokemonData = json_decode($api->pokemon((string)$id), true);

                    if (!$pokemonData || !isset($pokemonData['name'])) {
                        throw new \Exception('Incomplete data');
                    }

                    // Busca os detalhes da espécie do Pokémon para obter a cor
                    $speciesData = json_decode($api->pokemonSpecies((string)$id), true);

                    // Buscar detalhes das habilidades e suas descrições
                    $abilities = $pokemonData['abilities'] ?? [];
                    $abilityDescriptions = [];

                    foreach ($abilities as $ability) {
                        $abilityName = $ability['ability']['name'];
                        $abilityData = json_decode($api->ability($abilityName), true);
                        $abilityDescription = '';

                        foreach ($abilityData['effect_entries'] as $entry) {
                            if ($entry['language']['name'] === 'en') {
                                $abilityDescription = $entry['short_effect'];
                                break;
                            }
                        }

                        // Inclui a descrição da habilidade, mesmo que esteja vazia
                        $abilityDescriptions[] = [
                            'name' => $abilityName,
                            'description' => $abilityDescription
                        ];
                    }

                    $name = $pokemonData['name'] ?? 'Unknown';
                    $types = array_map(fn($type) => $type['type']['name'], $pokemonData['types'] ?? []);
                    $image = $pokemonData['sprites']['front_default'] ?? 'No image available';
                    $color = $speciesData['color']['name'] ?? 'Unknown'; // Obtém a cor do Pokémon

                    $randomPokemon[] = [
                        'name' => $name,
                        'types' => $types,
                        'image' => $image,
                        'color' => $color, // Adiciona a cor ao resultado
                        'id' => $id,
                        'abilities' => $abilityDescriptions, // Adiciona as habilidades e suas descrições
                    ];
                } catch (\Exception $e) {
                    // Log error if needed
                } finally {
                    $wg->done();
                }
            });
        }

        // Espera até que todas as corrotinas tenham terminado
        $wg->wait();

        $data = [
            'pokemon' => $randomPokemon,
            'id' => $totalPokemon,
        ];

        return $response->json($data)
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Max-Age', '86400');
    }
}
