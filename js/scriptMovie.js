/* Home Page */
const API_KEY_MOVIE = 'd2f34b9a104419286f424fa9734407f8&language=pt-BR';
const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/';
const BASE_URL_IMG_MOVIE = 'https://image.tmdb.org/t/p/w500/'
const filme = document.getElementById('filme');

const search = document.getElementById('search');
var btn = document.querySelector("#btn");

// Execute a function when the user presses a key on the keyboard
search.addEventListener("keypress", function(event) {
    
    // If the user presses the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btn.click();
    }
});


/* Home Page - films */
var apiUrlFilms = BASE_URL_MOVIE + 'discover/movie?sort_by=popularity.desc&api_key=' + API_KEY_MOVIE;
getMovies(apiUrlFilms);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
       showMovies(data.results) ;
    });
}

function showMovies(data){
    data.forEach(movie => {
        const {title, poster_path, vote_average,id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="col s12 m4">
                <div class="card blue-grey darken-1">
                    <div class="card-image">
                        <img src="${poster_path? BASE_URL_IMG_MOVIE+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
                    </div>
                    <div class="card-content white-text">
                        <span class="card-title">${title}</span>
                        <p>${vote_average}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" onclick="buscaId(`+id+`)">Mais infomações</a>
                    </div>
                </div>
            </div>
        `

        filme.appendChild(movieEl);
    });
}

/* Busca */

var req = new XMLHttpRequest();

function buscaFilme(){
    filme.innerHTML = '';
    var URL = BASE_URL_MOVIE + 'search/movie?api_key=' + API_KEY_MOVIE + '&query=' + search.value;

    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);
        data = resp_obj.results;
        data.forEach(movie => {
            const {title, poster_path, vote_average, id} = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <div class="col s12 m4">
                    <div class="card blue-grey darken-1">
                        <div class="card-image">
                            <img src="${poster_path? BASE_URL_IMG_MOVIE+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
                        </div>
                        <div class="card-content white-text">
                            <span class="card-title">${title}</span>
                            <p>${vote_average}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" onclick="buscaId(`+id+`)">Mais infomações</a>
                        </div>
                    </div>
                </div>
            `
    
            filme.appendChild(movieEl);
        });
    }

    req.open('GET', URL);
    req.send(null);
}

/* Busca filme por id */

var reqMovieId = new XMLHttpRequest();

function buscaId(id){
    var num = id;
    filme.innerHTML='';
    var URLMovieId = BASE_URL_MOVIE + 'movie/'+ num + '?api_key=' + API_KEY_MOVIE;

    reqMovie.onloadend = function(){
        resp = reqMovie.responseText;
        resp_obj = JSON.parse(resp);

        if(resp_obj.success){
            filme.innerHTML= `<p>Ops!:/ Ocorreu um erro.</p>`
        }else{
            data = resp_obj;
            const movieEl = document.createElement('div');
            movieEl.innerHTML = `
                <div class="col s12 m9">
                    <div class="card blue-grey darken-1">
                        <div class="card-image">
                            <img src="${data.poster_path? BASE_URL_IMG_MOVIE+data.poster_path: "http://via.placeholder.com/1080x1580" }" alt="${data.title}">
                        </div>
                        <div class="card-content white-text">
                            <span class="card-title">${data.title}</span>
                            <span class="card-title">Nota: ${data.vote_average}</span>
                            <span class="card-title">Tempo de duração: ${data.runtime}min</span>
                            <p>${data.overview}</p>
                        </div>
                        <div class="card-action">
                            <a href="index.html">Página Inicial</a>
                        </div>
                    </div>
                </div>
                `
                filme.appendChild(movieEl);
        }
        
    }

    reqMovie.open('GET', URLMovieId);
    reqMovie.send(null);
}