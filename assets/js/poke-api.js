
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    pokemon.abilities = pokeDetail.abilities
        .map((abilities => abilities.ability.name));

    return pokemon
}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = function (offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json()) //buscando lista pokemons
        .then((jsonBody) => jsonBody.results) //convertendo lista resultado
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        //transformando essa lista em uma lista de promessas do detalhe do pokemon e transformando ela em json
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
    
}

pokeAPI.getPokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((e) => alert('Pokemon Not Found!'));
}
