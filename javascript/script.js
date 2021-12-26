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
    const removeBook = document.createElement("div");
        removeBook.classList.add("removeBook");
        removeBook.textContent = "X";
        removeBook.addEventListener("click", handleDeleteBook);
        const isReadCheckbox = document.createElement("input");
        isReadCheckbox.type = "checkbox";
        isReadCheckbox.classList.add("isReadCheckbox");
        isReadCheckbox.addEventListener("click", handleIsReadCheckbox);
        book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
    const card = document.createElement("div");
    card.setAttribute("data-bookindex", myLibrary.indexOf(book))
    card.classList.add("card");
    card.textContent = `${book.title} ${book.author} ${book.pages}`;
    booksDisplay.appendChild(card);
    card.appendChild(removeBook);
    card.appendChild(isReadCheckbox);

    // Removes bookForm from screen
    handleAddBookAnimation();
}

// Creates card for all the books stored in the myLibrary array and renders them to the page
function displayBooks() {
    myLibrary.map(book => {
        const removeBook = document.createElement("div");
        removeBook.classList.add("removeBook");
        removeBook.textContent = "X";
        removeBook.addEventListener("click", handleDeleteBook);
        const isReadCheckbox = document.createElement("input");
        isReadCheckbox.type = "checkbox";
        isReadCheckbox.classList.add("isReadCheckbox");
        isReadCheckbox.addEventListener("click", handleIsReadCheckbox);
        const card = document.createElement("div")
        card.setAttribute("data-bookindex", myLibrary.indexOf(book))
        card.classList.add("card");
        card.textContent = `${book.title} ${book.author} ${book.pages}`
        card.style.backgroundImage = `url(${book.backgroundImage})`
        booksDisplay.appendChild(card)
        card.appendChild(removeBook);
        card.appendChild(isReadCheckbox);
    })
}

displayBooks();


// Deletes book from display and myLibrary array
function handleDeleteBook() {
    let bookIndex = this.parentElement.dataset.bookindex;
    myLibrary.splice(this.parentElement.dataset.bookindex, 1)
    this.parentElement.remove()
    handleRefreshOfBookIndex(bookIndex);
    console.log(myLibrary)
}

// Refreshes each book's index so it corresponds to the correct element in the array
// Starts from previously removed book's index so it doesn't have to loop through the entire array
function handleRefreshOfBookIndex(removedBookIndex) {
    for (let i = removedBookIndex; i < myLibrary.length; i++) {
        document.querySelectorAll(".card")[i].setAttribute("data-bookindex", i)
    }
}


// Reads checkbox for checked or not checked and sets the book to read or not read in the myLibrary array
function handleIsReadCheckbox(book) {
    if (book.target.checked === false) {
        myLibrary[book.target.parentElement.dataset.bookindex].read = false;
        return;
    }
    myLibrary[book.target.parentElement.dataset.bookindex].read = true;
}

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