const APIURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;

//&language=pt-BR
console.log(API_KEY)

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'; 

const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APIURL) //1º: pegar os filmes mais populares


//A chamada de API pode demorar um pouco, então, para que todo o aplicativo não trave esperando a resposta da API, se usa uma função assincrona, assim o programa contiua rodando o resto do código e se completa quando a resposta chega. Porém, dentro da função, onde se usa o parametro await, que faz com q a função espere a informação da linha marcada com await para poder continuar, sem dar erro.
async function getMovies(url) {

    const resp = await fetch(url); //o comando fetch serve para puxar os dados da API
    const respData = await resp.json();

    showMovies(respData.results);

}

function showMovies(movies) {
    //clean main
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img 
                src="${IMGPATH + poster_path}" 
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview}
                </div>
            `;
        
            main.appendChild(movieEl);
    });
}

function getClassbyRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = ''

    }

});



//LEMBRAR DE ESCONDER A API KEY

