/* Home Page */

//Constantes filmes
const API_KEY_MOVIE = 'd2f34b9a104419286f424fa9734407f8&language=pt-BR';
const BASE_URL_MOVIE = 'https://api.themoviedb.org/3/';
const BASE_URL_IMG_MOVIE = 'https://image.tmdb.org/t/p/w500/'
const filme = document.getElementById('filme');

//Constantes livros
const API_KEY_BOOK = 'AIzaSyDogM5ItMMBK0dS1CJg2_cQqC_xNi7Iz1w';
const BASE_URL_BOOK = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
const livro = document.getElementById('livro');

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

/* Home page - livros */
var apiUrlBooks = BASE_URL_BOOK + 'flor&key=' + API_KEY_BOOK;
getBooks(apiUrlBooks);

function getBooks(url){
    fetch(url).then(res => res.json()).then(data => {
        showBooks(data.items);
     });
}

function showBooks(data){
    data.forEach(book => {
        const{volumeInfo} = book;
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');
        bookEl.innerHTML = `
        <div class="col s12 m4">
            <div class="card blue-grey darken-1">
                <div class="card-image">
                    <img src="${volumeInfo.imageLinks? volumeInfo.imageLinks.smallThumbnail : "http://via.placeholder.com/1080x1580"}">
                </div>
                <div class="card-content white-text">
                    <span class="card-title">${volumeInfo.title}</span>
                    <span>${volumeInfo.authors}</span>
                    <p>${volumeInfo.description}</p>
                </div>
            </div>
        </div>
        `
        livro.appendChild(bookEl);
    })
    
}

/* Busca */

function busca(){
    buscaFilme();
    buscaLivro();
}


var reqMovie = new XMLHttpRequest();
var reqBook = new XMLHttpRequest();

function buscaFilme(){
    filme.innerHTML = '';
    var URLMovie = BASE_URL_MOVIE + 'search/movie?api_key=' + API_KEY_MOVIE + '&query=' + search.value;
    reqMovie.onloadend = function(){
        resp = reqMovie.responseText;
        resp_obj = JSON.parse(resp);
        data = resp_obj.results;
        if(data.length == 0){
            filme.innerHTML= `<p>Ops!:/ Nenhum filme foi encontrado com as palavras fornecidas.</p>`
        }else{
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
        
    }

    reqMovie.open('GET', URLMovie);
    reqMovie.send(null);
}

function buscaLivro(){
    livro.innerHTML = '';
    var URLBook = BASE_URL_BOOK + search.value + "&key=" + API_KEY_BOOK;

    reqBook.onloadend = function(){
        resp = reqBook.responseText;
        resp_obj = JSON.parse(resp);
        if(resp_obj.totalItems == 0){
            livro.innerHTML= `<p>Ops!:/ Nenhum livro foi encontrado com as palavras fornecidas.</p>`
        }else{
            data = resp_obj.items;
            data.forEach(book => {
                const{volumeInfo} = book;
                const bookEl = document.createElement('div');
                bookEl.classList.add('book');
                bookEl.innerHTML = `
                <div class="col s12 m4">
                    <div class="card blue-grey darken-1">
                        <div class="card-image">
                            <img src="${volumeInfo.imageLinks? volumeInfo.imageLinks.smallThumbnail : "http://via.placeholder.com/1080x1580"}">
                        </div>
                        <div class="card-content white-text">
                            <span class="card-title">${volumeInfo.title}</span>
                            <span>${volumeInfo.authors}</span>
                            <p>${volumeInfo.description}</p>
                        </div>
                    </div>
                </div>
                `
                livro.appendChild(bookEl);
            });
        }
    }

    reqBook.open('GET', URLBook);
    reqBook.send(null);
}

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
                            <a href="homePage.html">Página Inicial</a>
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

