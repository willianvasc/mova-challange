# Pokémon Challenge

---

**Video de apresentação:** https://drive.google.com/file/d/1aILliba2Tvgz7DBQAB4mfmpJfTNzIq0P/view?usp=drive_link

---

Este projeto foi desenvolvido utilizando JavaScript e PHP, com o backend gerido pelo framework **HyperF** e o frontend pelo **React**. O Docker é utilizado para gerenciar tanto o frontend quanto o backend, garantindo um ambiente de desenvolvimento consistente e isolado.

## Tecnologias Utilizadas

- **HyperF**: Utilizado para o desenvolvimento do backend em PHP, proporcionando alta performance e suporte para corrotinas e waitgroups.
- **React**: Framework utilizado para o desenvolvimento do frontend, proporcionando uma interface de usuário moderna e reativa.
- **JavaScript**: A linguagem principal utilizada para o desenvolvimento do frontend, complementando o React.
- **PHP**: Utilizado no backend para construir a lógica de negócios e manipular dados.
- **Docker**: Ferramenta de containerização utilizada para garantir que o ambiente de desenvolvimento seja consistente em diferentes máquinas, isolando o frontend e o backend.

## Funcionalidades

- **Frontend em React**: Uma interface de usuário interativa que se comunica com o backend para obter dados e exibir informações relevantes.
- **Backend em HyperF**: Um backend eficiente, capaz de lidar com múltiplas requisições simultâneas, implementando corrotinas para otimização de desempenho.
- **API RESTful**: O frontend e o backend se comunicam através de uma API RESTful, trocando dados em formato JSON.
- **Gerenciamento de Contêineres com Docker**: Tanto o frontend quanto o backend são geridos por Docker, garantindo portabilidade e consistência no ambiente de desenvolvimento.

## Como Executar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/pokemon-challenge.git
   ```

2. **Navegue até o Diretório do Projeto:**
   ```bash
   cd pokemon-challenge
   ```

3. **Construa e Inicie os Contêineres Docker:**
   ```bash
   docker-compose up --build
   ```

4. **Acesse a Aplicação:**
   - O frontend estará disponível em `http://localhost:5173`.
   - O backend estará disponível em `http://localhost:9501`.

## Estrutura do Projeto

- **/pokedex-front**: Contém o código do frontend desenvolvido em React.
```
   // Path: pokedex-front/src/routes/home.jsx
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

```
- **/pokedex-back**: Contém o código do backend desenvolvido com HyperF em PHP.
```
  // composer require danrovito/pokephp
 // Api para a consulta de pokemons
 $api = new PokeApi();
```
- **Dockerfile**: Define como os contêineres Docker são configurados e executados.
- **docker-compose.yml**: Configura os serviços necessários para a aplicação, como o frontend e o backend.
