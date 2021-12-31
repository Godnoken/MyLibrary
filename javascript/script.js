//import Axios from 'axios';

/** Elements */

const body = document.body;
const menuButton = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const addBookButton = document.querySelector("#addBookButton");
const exitAddBookFormButton = document.querySelector("#exitAddBook");
const booksDisplay = document.querySelector("#booksDisplay");
const bookForm = document.querySelector("#bookForm")
const bookFormSubmit = document.querySelector("#bookFormSubmit")
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookCover = document.querySelector("#bookCover");
const bookRead = document.querySelector("#read")
let bookCards = document.querySelectorAll(".card");




// Initalize library array
let myLibrary = [];

// Constructor for books
function Book(title = "", author = "", pages = "", backgroundImage = "", read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.backgroundImage = backgroundImage
    this.read = read
}

// Dummy data
const LOTR = new Book("Lord Of The Rings", "J.R.R. Tolkien", "421", "https://images-na.ssl-images-amazon.com/images/I/81rzgaqcfZL.jpg", false)
const STARWARS = new Book("Star Wars", "George Lucas", "351", "https://d29xot63vimef3.cloudfront.net/image/star-wars-books/1-1.jpg", true);
const HJARNSTARK = new Book("Hjärnstark", "Anders Hansen", "268", "https://image.bokus.com/images/9789173630788_200x_hjarnstark-hur-motion-och-traning-starker-din-hjarna", true);

myLibrary.push(LOTR, STARWARS, HJARNSTARK, new Book(), new Book());

for (let i = 0; i < 200; i++) {
    let bookCover = `https://picsum.photos/200/${Math.floor(Math.random() * 400) + 300}`;
    for (let j = 0; j < 1; j++) {
        myLibrary.push(new Book("", "", "", bookCover));
    
    }
}


// If local storage isn't empty, set myLibrary to local storage. Otherwise keep dummy data for new users
if (window.localStorage.length === 0) window.localStorage.setItem("userLibrary", JSON.stringify([]))
if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) myLibrary = JSON.parse(window.localStorage.getItem("userLibrary"));
saveToLocalStorage();




/** Functions */


function isInViewport(book) {
    const rect = book.getBoundingClientRect();
    return (
        rect.top >= 0 - 350 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + 350 || document.documentElement.clientHeight + 350) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Saves entire library to local storage aka browser
function saveToLocalStorage() {
    localStorage.setItem("userLibrary", JSON.stringify(myLibrary));
}


// Creates card for all the books stored in the myLibrary array and renders them to the page
function displayBooks() {

    myLibrary.map(book => {
        createCard(book);
    })
    
    bookCards = document.querySelectorAll(".card");

    bookCards.forEach(book => {
        if (isInViewport(book) === false) book.style.visibility = "hidden";
    })
}



let scheduledAnimationFrame;

function onScroll() {

   // Prevent multiple rAF callbacks.
   if (scheduledAnimationFrame) {
      return;
   }

   scheduledAnimationFrame = true;

   // Decides how often to listen to the scroll animations
   setTimeout(handleVisibleCards, 250);
}

document.addEventListener("scroll", onScroll)
document.addEventListener("resize", handleVisibleCards);

function handleVisibleCards() {
    scheduledAnimationFrame = false;

    bookCards.forEach(book => {
        if (isInViewport(book) === false) book.style.visibility = "hidden";
        else book.style.visibility = "visible";
    })
}


bookFormSubmit.addEventListener("click", addBook);

function addBook(event) {

    // Prevents reloading of the page
    event.preventDefault();

    for (let i = 0; i < bookForm.length - 2; i++) {
        if (bookForm.children[i].value !== "") {
            
            // Adds new book to array
            const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookCover.value, bookRead.checked);
            myLibrary.push(bookToAdd);
        
            // Creates card for the new book and renders it on the page
            let book = myLibrary[myLibrary.length - 1];
            createCard(book);
        
            // Removes bookForm from screen
            handleAddBookAnimation();
        
            saveToLocalStorage();
            return;
        }
    }

    alert("Need user input!")
}


function createCard(book) {
    const card = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");
    const removeBook = document.createElement("div");
    const isReadCheckbox = document.createElement("input");

    card.classList.add("card");
    flipCardInner.classList.add("flipCardInner");
    flipCardFront.classList.add("flipCardFront");
    flipCardBack.classList.add("flipCardBack");
    removeBook.classList.add("removeBook");
    isReadCheckbox.classList.add("isReadCheckbox");

    removeBook.addEventListener("click", handleDeleteBook);
    isReadCheckbox.addEventListener("click", handleIsReadCheckbox);
    
    card.setAttribute("data-bookindex", myLibrary.indexOf(book));
    removeBook.textContent = "X";
    isReadCheckbox.type = "checkbox";

    // Adds content to the book card only if user input something
    for (let i = 0; i < Object.values(book).length - 2; i++) {
        if (Object.values(book)[i] !== "") {
            const paragraph = document.createElement("p");
            paragraph.textContent = Object.values(book)[i];
            flipCardBack.appendChild(paragraph);
            flipCardBack.appendChild(isReadCheckbox);
        }
    }

    if (Object.values(book)[3] !== "") flipCardFront.style.backgroundImage = `url(${book.backgroundImage})`;
    //if (Object.values(book)[3] !== "") flipCardFront.setAttribute("data-src", book.backgroundImage)

    booksDisplay.appendChild(card);
    card.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.appendChild(removeBook);
    
    book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
}


// Refreshes each book's index so it corresponds to the correct element in the array
// Starts from previously removed book's index so it doesn't have to loop through the entire array
function handleRefreshOfBookIndex(removedBookIndex) {

    bookCards = document.querySelectorAll(".card");

    for (let i = removedBookIndex; i < myLibrary.length; i++) {
        bookCards[i].setAttribute("data-bookindex", i);
    }
}


// Deletes book from display and myLibrary array
function handleDeleteBook() {
    let book = this.parentElement.parentElement.parentElement;

    // Updates variable tracking cards of books
    bookCards = document.querySelectorAll(".card");

    smoothDeletion(book);

    saveToLocalStorage();
}

function smoothDeletion(book) {
    let bookNumber = Number(book.dataset.bookindex);
    
    book.classList.toggle("hide");
    
    for (let i = bookNumber + 1; i < bookNumber + 25; i++) {
        bookCards[i].style.transitionDuration = "0.65s";
        let cardPosition = bookCards[i].getBoundingClientRect();
        let previousCardPosition = bookCards[i].previousElementSibling.getBoundingClientRect();
        bookCards[i].style.transform = `translate(${previousCardPosition.x - cardPosition.x}px, ${previousCardPosition.y - cardPosition.y}px)`;
    }

    myLibrary.splice(book.dataset.bookindex, 1)

    setTimeout(() => {
        book.remove()
        handleRefreshOfBookIndex(bookNumber);
        
        
        for (let i = bookNumber; i < bookNumber + 25; i++) {
            bookCards[i].style.transitionDuration = "0.0000001s";
            bookCards[i].style.transform = "none";
            bookCards[i].style.visibility = "visible"
        }
    }, 650)
}



// Reads checkbox for checked or not checked and sets the book to read or not read in the myLibrary array
function handleIsReadCheckbox(book) {

    const bookTarget = book.target.parentElement.parentElement.parentElement;
    const checkbox = book.target;

    if (checkbox.checked === false) {
        myLibrary[bookTarget.dataset.bookindex].read = false;
        saveToLocalStorage();
        return;
    }

    myLibrary[bookTarget.dataset.bookindex].read = true;
    saveToLocalStorage();
}






/** Animations */

// Handles animation of the menu button
menuButton.addEventListener("click", handleMenuAnimation)

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

// Handles animation of the form that lets user add a book
addBookButton.addEventListener("click", handleAddBookAnimation);
exitAddBookFormButton.addEventListener("click", handleAddBookAnimation);

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




/** Run at start */

displayBooks();