import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card.jsx";
import pokemonImage from "../../public/pokelogo.png";
import ClipLoader from "react-spinners/ClipLoader"; // Importa o loader

const Home = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true); // Adiciona estado de carregamento

    // Função para buscar dados dos Pokémon
    const fetchPokemonData = async () => {
        setLoading(true); // Inicia o carregamento
        try {
            const response = await axios.post('http://localhost:9501/');
            setPokemonData(response.data.pokemon || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Termina o carregamento
        }
    };

    // UseEffect para buscar dados quando o componente for montado
    useEffect(() => {
        fetchPokemonData();
    }, []);

    const handleButtonClick = () => {
        const icon = document.querySelector(".rotate-icon");
        icon.classList.add("spin");

        fetchPokemonData().finally(() => {
            icon.classList.remove("spin");
        });
    };

    return (
        <div>
            <div className="w-100 bg-light p-2">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={pokemonImage} width="200px" alt="Pokemon" />
                        </a>
                        <button className="btn btn-warning" onClick={handleButtonClick}>
                            Atualizar Pokémons <i className="fas fa-redo rotate-icon"></i>
                        </button>
                    </div>
                </nav>
            </div>
            <div className="text-center">
                <div className="container">
                    <div className="row mx-0 mt-5" id="container-pokemon">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                <ClipLoader color="#000" loading={loading} size={50} />
                            </div>
                        ) : (
                            // Mapeia o array pokemonData para criar múltiplos cards
                            pokemonData.map((pokemon, index) => (
                                <div className="col-4 mb-4" key={index}>
                                    <Card
                                        name={pokemon.name}
                                        type={pokemon.types.join(', ')}
                                        image={pokemon.image}
                                        color={pokemon.color}
                                        abilities={pokemon.abilities}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
