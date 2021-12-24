let myLibrary = ["Book1", "Book2", {title: "Lord Of The Rings", author: "J.R.R. Tolkien"}];

const body = document.body;

function displayBooks() {
    myLibrary.map(book => {
        const card = document.createElement("div")
        card.textContent = book.title + " " + book.author
        body.appendChild(card)
    })
}

displayBooks();