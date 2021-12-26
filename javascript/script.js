let myLibrary = [
    {
        title: "Lord Of The Rings",
        author: "J.R.R. Tolkien",
        pages: "434",
        read: false,
        backgroundImage: "https://images-na.ssl-images-amazon.com/images/I/81rzgaqcfZL.jpg"
    }

];

const body = document.body;

function Book(title, author, pages, read = false, backgroundImage = "") {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.backgroundImage = backgroundImage
}

const STARWARS = new Book("Star Wars", "George Lucas", "351", "false", "https://d29xot63vimef3.cloudfront.net/image/star-wars-books/1-1.jpg");

myLibrary.push(STARWARS);


const bookForm = document.querySelector("#bookForm")
const bookFormSubmit = document.querySelector("#bookFormSubmit")
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookRead = document.querySelector("#read")


const booksDisplay = document.querySelector("#booksDisplay");

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
    card.classList.add("card");
    card.textContent = `${book.title} ${book.author} ${book.pages} ${book.read}`;
    booksDisplay.appendChild(card);

    // Removes bookForm from screen
    if (bookForm.className === "activeAddBook") {
        bookForm.classList.remove("activeAddBook");
        bookForm.classList.add("inactiveAddBook");
    }
}

// Creates card for all the books stored in the myLibrary array and renders them to the page
function displayBooks() {
    myLibrary.map(book => {
        const card = document.createElement("div")
        card.classList.add("card");
        card.textContent = `${book.title} ${book.author} ${book.pages} ${book.read}`
        card.style.backgroundImage = `url(${book.backgroundImage})`
        booksDisplay.appendChild(card)
    })
}

displayBooks();




/** Animations */

document.querySelector("#menuButton").addEventListener("click", handleMenuAnimation)

const menu = document.querySelector("#menu");

function handleMenuAnimation() {
    if (menu.className === "activeMenu") {
        menu.classList.remove("activeMenu");
        menu.classList.add("inactiveMenu");
    } else if (menu.className === "inactiveMenu") {
        menu.classList.remove("inactiveMenu");
        menu.classList.add("activeMenu");
    } else {
        menu.classList.add("activeMenu");
    }
}

document.querySelector("#addBookButton").addEventListener("click", handleAddBookAnimation);
document.querySelector("#exitAddBook").addEventListener("click", handleAddBookAnimation);

function handleAddBookAnimation() {
    if (bookForm.className === "activeAddBook") {
        bookForm.classList.remove("activeAddBook");
        bookForm.classList.add("inactiveAddBook");
    } else if (bookForm.className === "inactiveAddBook") {
        bookForm.classList.remove("inactiveAddBook");
        bookForm.classList.add("activeAddBook");
    } else {
        bookForm.classList.add("activeAddBook");
    }
}