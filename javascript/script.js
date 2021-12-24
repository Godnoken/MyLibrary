let myLibrary = [{title: "Lord Of The Rings", author: "J.R.R. Tolkien"}];

function Book(title, author) {
    this.title = title
    this.author = author
}

const STARWARS = new Book("Star Wars", "George Lucas");

myLibrary.push(STARWARS);

function addBook() {

}

const body = document.body;

function displayBooks() {
    myLibrary.map(book => {
        const card = document.createElement("div")
        card.textContent = book.title + " " + book.author
        body.appendChild(card)
    })
}

displayBooks();