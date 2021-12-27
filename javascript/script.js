let myLibrary = [
    {
        title: "Lord Of The Rings",
        author: "J.R.R. Tolkien",
        pages: "434",
        backgroundImage: "https://images-na.ssl-images-amazon.com/images/I/81rzgaqcfZL.jpg",
        read: false
    }

];

const body = document.body;

function Book(title, author, pages, backgroundImage = "", read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.backgroundImage = backgroundImage
    this.read = read
}

const STARWARS = new Book("Star Wars", "George Lucas", "351", "https://d29xot63vimef3.cloudfront.net/image/star-wars-books/1-1.jpg", "false");

myLibrary.push(STARWARS);


const bookForm = document.querySelector("#bookForm")
const bookFormSubmit = document.querySelector("#bookFormSubmit")
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookCover = document.querySelector("#bookCover");
const bookRead = document.querySelector("#read")


const booksDisplay = document.querySelector("#booksDisplay");

// Adds a new book when pressing submit
bookFormSubmit.addEventListener("click", addBook);

function addBook(event) {
    
    // Prevents reloading of the page
    event.preventDefault();
    
    // Adds new book to array
    const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookCover.value, bookRead.checked);
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
    card.style.backgroundImage = `url(${book.backgroundImage})`
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
        booksDisplay.appendChild(card)
        const flipCardInner = document.createElement("div");
        const flipCardFront = document.createElement("div");
        const flipCardBack = document.createElement("div");
        flipCardInner.classList.add("flipCardInner");
        flipCardFront.classList.add("flipCardFront");
        flipCardBack.classList.add("flipCardBack");
        card.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCardBack.textContent = `${book.title} ${book.author} ${book.pages}`
        flipCardBack.appendChild(isReadCheckbox);
        flipCardBack.appendChild(removeBook);
        flipCardFront.style.backgroundImage = `url(${book.backgroundImage})`
    })
}

displayBooks();


// Deletes book from display and myLibrary array
function handleDeleteBook() {
    let book = this.parentElement.parentElement.parentElement;
    myLibrary.splice(book.dataset.bookindex, 1)
    book.remove()
    handleRefreshOfBookIndex(book.dataset.bookindex);
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