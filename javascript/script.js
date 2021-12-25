let myLibrary = [{title: "Lord Of The Rings", author: "J.R.R. Tolkien"}];

const body = document.body;

function Book(title, author, pages, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const STARWARS = new Book("Star Wars", "George Lucas", "351", "false");

myLibrary.push(STARWARS);

const addBookButton = document.createElement("button");
addBookButton.style.width = "125px";
addBookButton.style.height = "35px";
addBookButton.textContent = "Add Book";

body.appendChild(addBookButton);

const bookForm = document.querySelector("#bookForm")
const bookFormSubmit = document.querySelector("#bookFormSubmit")
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookRead = document.querySelector("#read")

// Adds a new book when pressing submit
bookFormSubmit.addEventListener("click", addBook);

function addBook(event) {

    // Prevents reloading of the page
    event.preventDefault();

    // Adds new book to array
    const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    myLibrary.push(bookToAdd);

    // Creates card for the new book added to the array and renders it on the page
    let book = myLibrary[myLibrary.length - 1];
    const card = document.createElement("div");
    card.textContent = `${book.title} ${book.author} ${book.pages} ${book.read}`;
    body.appendChild(card);
}

// Creates card for all the books stored in the myLibrary array and renders them to the page
function displayBooks() {
    myLibrary.map(book => {
        const card = document.createElement("div")
        card.textContent = `${book.title} ${book.author} ${book.pages} ${book.read}`
        body.appendChild(card)
    })
}

displayBooks();