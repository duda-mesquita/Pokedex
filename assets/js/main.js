
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;



//OBSERVACOES GERAIS:
//estrutura fetch (then, catch e finally) = estrutura try, catch e finally = faca isso, se nao isso, e finalmente faca isso
//OBS finally executa independente de catch capturar ou nao um erro
//Sinal => significa arrow function. Normalmente usado para funcoes de call back. Nao precisa ser declarado nome da function.
//Posso substituir a palavra reservada 'function' pelo sinal de '=>' para arrow function
//Para as arrow functions com retorno de uma linha soh, pode ser otimizado colocando o retorno ao lado do sinalzinho.

//desafio inicio

const moreDetails = (name) => {
    pokeAPI.getPokemonByName(name)
        .then((details) => {
            const more = document.getElementById('moreDetails');

            more.removeAttribute('class');
            more.classList.add(details.type);

            document.getElementById('moreDetails').classList.add('active');
            document.querySelector('#more h2').innerHTML = details.name;
            document.querySelector('#more #number').innerHTML = `#${details.number}`;

            document.querySelector('#more .details #abilities').innerHTML = `
                Abilities: ${details.abilities.map((ability) => `${ability}`).join(', ')}
            `;

            document.querySelector('#more img').src = details.photo;
            document.querySelector('#more .details #species').innerHTML = `Species: ${details.species}`;
            document.querySelector('#more .details #height').innerHTML = `Height: ${details.height}`;
            document.querySelector('#more .details #weight').innerHTML = `Weight: ${details.weight}`;
        });
}
//desafio fim
function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name"><button type="button" onclick='moreDetails("${pokemon.name}")'>${pokemon.name}</button></span>
                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                </div>
            </li>
            
         `).join('')

        pokemonList.innerHTML += newHtml
        //innerHTML para converter em html a funcao convertPokemonToLi. pokemons.map para percorrer a classe pokemons com o map
        //.join para juntar todos os li
        // OBS do .join = usado com('') para dar espaco entre os codigos html do li usando espaco vazio ao inves de virgula que viria por default
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordsNextPage = offset + limit

    if (qtRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        //removendo botao de load more quando chegar na quantidade limite (maxRecords)
    } else {
        loadPokemonItens(offset, limit)
    }
})
    
