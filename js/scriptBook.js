const API_KEY_BOOK = 'AIzaSyDogM5ItMMBK0dS1CJg2_cQqC_xNi7Iz1w';
const BASE_URL_BOOK = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
const livro = document.getElementById('livro');
const search = document.getElementById('search');

var btn = document.querySelector("#btn");
var req = new XMLHttpRequest();

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


/* Home Page */
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


/* Search by name or word */
function buscaLivro(){
    livro.innerHTML = '';
    var URL = BASE_URL_BOOK + search.value + "&key=" + API_KEY_BOOK;

    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);
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

    req.open('GET', URL);
    req.send(null);
}