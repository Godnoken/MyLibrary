/** Global Variables */

let myLibrary = [];
let currentPage = 1;
let googleBooks;
let amountOfGoogleBooks;
let startIndex = 0;
let pageStartIndex = 1;
let googleSearch = "sports";


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
const bookPages = document.querySelector("#formPages")
const bookCover = document.querySelector("#bookCover");
const bookRead = document.querySelector("#read")
let bookCards = document.querySelectorAll(".card");
const pages = document.querySelector("#pages");
const google = document.querySelector("#google");
const googleButton = document.querySelector("#googleButton");
const myLibraryButton = document.querySelector("#myLibrary");
let pageNumbers = document.querySelector("#pages").childNodes;


/** Event Listeners */

googleButton.addEventListener("click", () => { if (google.value !== "") handleGoogleSearch() });
myLibraryButton.addEventListener("click", showMyLibrary);
document.addEventListener("scroll", onScroll)
document.addEventListener("resize", handleVisibleCards);
bookFormSubmit.addEventListener("click", addBook);
menuButton.addEventListener("click", handleMenuAnimation)
addBookButton.addEventListener("click", handleAddBookAnimation);
exitAddBookFormButton.addEventListener("click", handleAddBookAnimation);





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

myLibrary.push(LOTR, STARWARS, HJARNSTARK);

for (let i = 0; i < 50; i++) {
    let bookCover = `https://picsum.photos/200/${Math.floor(Math.random() * 150) + 300}`;
    for (let j = 0; j < 1; j++) {
        myLibrary.push(new Book("", "", "", bookCover));

    }
}


// If local storage isn't empty, set myLibrary to local storage. Otherwise keep dummy data for new users
if (window.localStorage.length === 0) window.localStorage.setItem("userLibrary", JSON.stringify([]))
if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) myLibrary = JSON.parse(window.localStorage.getItem("userLibrary"));
saveToLocalStorage();

let googleBooksArray = [];

function getGoogleBooks() {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleSearch}&maxResults=40&startIndex=${startIndex}&key=AIzaSyBZQlasiygfXSG7iKMwkpanVK8F_D4hDzQ`)
        .then(response => {
            if (response.data.items !== "undefined") {
                googleBooksArray.push(...response.data.items);
                googleBooks = response.data.items;
                amountOfGoogleBooks = response.data.totalItems;
            }
        })
        .catch(error => {
            return;
            console.log(`You ran into.. ${error}`)
            alert(`You ran into.. ${error}`)
        })
}

let previousGoogleSearch;
googleSearch = google.value;

function handleGoogleSearch() {
    startIndex = 0;
    pageStartIndex = 1;
    previousGoogleSearch = googleSearch;

    removeAllBooksFromDisplay();

    if (previousGoogleSearch !== google.value) {
        googleBooksArray = [];
        googleSearch = google.value;

        for (let i = 0; i < 10; i++) {
            getGoogleBooks();
            startIndex += 40;
        }

        setTimeout(() => {
            startIndex = 0;
            displayBooks();
        }, 1200)

        setTimeout(() => {
            createPageNumbers(googleBooksArray.length);
        }, 1500)
    }
    else {
        displayBooks();
        createPageNumbers(googleBooksArray.length)
    }
}

function removeAllBooksFromDisplay() {
    // Convert from childNodes to array because of a bug(?)
    let booksDisplayArray = Array.from(booksDisplay.childNodes);

    // Remove all currently displayed books
    booksDisplayArray.forEach(book => {
        book.remove();
    });
}

function createPageNumbers(amountOfBooks) {
    pageNumbers = Array.from(pageNumbers);
    pageNumbers.forEach(page => page.remove());

    let pagesToCreate = 0;
    let pagesToCreateForGoogle = 0;

    for (let i = 0; i < amountOfBooks; i += 40) {
        pagesToCreate++;
        if (i < 400) pagesToCreateForGoogle++;
    }



    if (googleBooksArray.length !== 0) {
        for (let i = pageStartIndex; i < pagesToCreateForGoogle + 1; i++) {
            const pageNumberButton = document.createElement("p");
            pageNumberButton.textContent = i;
            pages.appendChild(pageNumberButton);
        }
    }
    else {
        for (let i = pageStartIndex; i < pagesToCreate + 1; i++) {
            const pageNumberButton = document.createElement("p");
            pageNumberButton.textContent = i;
            pages.appendChild(pageNumberButton);
        }
    }


    pageNumbers = document.querySelector("#pages").childNodes;
    pageNumbers.forEach(page => page.addEventListener("click", handlePageChange));

    const nextListOfPagesButton = document.createElement("p");
    const previousListOfPagesButton = document.createElement("p");
    nextListOfPagesButton.textContent = ">";
    previousListOfPagesButton.textContent = "<";
    nextListOfPagesButton.addEventListener("click", () => handleListOfPagesChange("next", pagesToCreate));
    previousListOfPagesButton.addEventListener("click", () => handleListOfPagesChange("previous", pagesToCreate));
    pages.appendChild(nextListOfPagesButton);
    pages.prepend(previousListOfPagesButton);
}

function handleListOfPagesChange(direction, amountOfPages) {

    if (direction === "next" && pageStartIndex < amountOfPages - 10) pageStartIndex += 10;
    if (direction === "previous" && pageStartIndex > 10) pageStartIndex -= 10;

    if (googleBooksArray.length !== 0) return createPageNumbers(googleBooksArray.length);
    createPageNumbers(myLibrary.length);
}


// Lets user view 10 pages of search results from google books, containing 40 books each
function handlePageChange(event) {
    let clickedPage = Number(event.target.textContent);

    // Lets google books api know which index to read books from
    startIndex = 0;

    currentPage = clickedPage;

    if (clickedPage !== 1) startIndex = 40;
    if (clickedPage !== 2 && clickedPage !== 1) startIndex = startIndex * clickedPage - 40;

    removeAllBooksFromDisplay();

    // Get new books from chosen page
    displayBooks();

    if (googleBooksArray.length !== 0) createPageNumbers(googleBooksArray.length);
}



function showMyLibrary() {
    startIndex = 0;
    pageStartIndex = 1;
    currentPage = 1;
    googleBooksArray = [];
    googleSearch = "";

    removeAllBooksFromDisplay();
    displayBooks();
}

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

    // Remove all page numbers
    pageNumbers = Array.from(pageNumbers);
    pageNumbers.forEach(page => page.remove());

    if (googleBooksArray.length !== 0) {
        //createPageNumbers(googleBooksArray.length);
        for (let i = startIndex; i < startIndex + 40; i++) {
            if (googleBooksArray[i]) createCard(googleBooksArray[i])
        }

    }
    else {
        for (let i = startIndex; i < startIndex + 40; i++) {
            if (myLibrary[i]) createCard(myLibrary[i])
        }
        createPageNumbers(myLibrary.length);
    }



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



function handleVisibleCards() {
    scheduledAnimationFrame = false;

    bookCards.forEach(book => {
        if (isInViewport(book) === false) book.style.visibility = "hidden";
        else book.style.visibility = "visible";
    })
}




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

    // If user made a google search
    if (googleBooksArray.length !== 0) {

        const title = document.createElement("p");
        const authors = document.createElement("p");
        const pageCount = document.createElement("p");

        title.textContent = `Title: ${book["volumeInfo"].title}`
        authors.textContent = `Author: ${book["volumeInfo"].authors}`
        pageCount.textContent = `Pages : ${book["volumeInfo"].pageCount}`

        flipCardBack.appendChild(title);
        flipCardBack.appendChild(authors);
        flipCardBack.appendChild(pageCount);
        flipCardBack.appendChild(isReadCheckbox);

        const addGoogleBook = document.createElement("button");
        addGoogleBook.textContent = "Add Book";
        addGoogleBook.addEventListener("click", addGoogleBookToLibrary);

        flipCardBack.appendChild(addGoogleBook);

        if (book["volumeInfo"].hasOwnProperty("imageLinks")) {
            flipCardFront.style.backgroundImage = `url(${book["volumeInfo"]["imageLinks"]["thumbnail"]})`;
        }
    }

    // If user clicked on "My Library"
    else {
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
    }

    booksDisplay.appendChild(card);
    card.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.appendChild(removeBook);

    book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
}

function addGoogleBookToLibrary(event) {
    const googleBook = event.target.parentElement;
    console.log(event.target.parentElement.childNodes)
    console.log(googleBook.previousElementSibling.style.backgroundImage)
    let googleBookBackgroundImage = googleBook.previousElementSibling.style.backgroundImage.slice(5, -2);
    const bookToAdd = new Book(googleBook.childNodes[0].textContent, googleBook.childNodes[1].textContent, googleBook.childNodes[2].textContent, googleBookBackgroundImage, googleBook.childNodes[3].checked);
    myLibrary.push(bookToAdd);

    saveToLocalStorage();
}


// Refreshes each book's index so it corresponds to the correct element in the array
// Starts from previously removed book's index so it doesn't have to loop through the entire array
function handleRefreshOfBookIndex(removedBookIndex, currentBookIndex, lastBook) {

    bookCards = document.querySelectorAll(".card");

    for (let i = removedBookIndex; i < lastBook; i++) {
        bookCards[currentBookIndex].setAttribute("data-bookindex", i);
        currentBookIndex++;
    }
}


// Deletes book from display and myLibrary array
function handleDeleteBook() {
    let book = this.parentElement.parentElement.parentElement;

    // Updates variable tracking cards of books
    bookCards = document.querySelectorAll(".card");

    smoothBookDeletion(book);

    saveToLocalStorage();
}

function smoothBookDeletion(deleteThisBook) {
    let bookNumber = Number(deleteThisBook.dataset.bookindex);
    let lastBook = Number(bookCards[bookCards.length - 1].dataset.bookindex);

    deleteThisBook.classList.toggle("hide");

    let deletedBookIndex;

    for (let i = 0; i < bookCards.length; i++) {
        if (bookCards[i] === deleteThisBook) deletedBookIndex = i;
    }

    let currentBookIndex = deletedBookIndex + 1;

    for (let i = bookNumber; i < lastBook; i++) {
        bookCards[currentBookIndex].style.transitionDuration = "0.65s";
        let cardPosition = bookCards[currentBookIndex].getBoundingClientRect();
        let previousCardPosition = bookCards[currentBookIndex].previousElementSibling.getBoundingClientRect();
        bookCards[currentBookIndex].style.transform = `translate(${previousCardPosition.x - cardPosition.x}px, ${previousCardPosition.y - cardPosition.y}px)`;
        currentBookIndex++;
    }

    myLibrary.splice(deleteThisBook.dataset.bookindex, 1)

    setTimeout(() => {
        deleteThisBook.remove()
        currentBookIndex = deletedBookIndex;
        handleRefreshOfBookIndex(bookNumber, currentBookIndex, lastBook);

        for (let i = bookNumber; i < lastBook; i++) {
            bookCards[currentBookIndex].style.transitionDuration = "0.0000001s";
            bookCards[currentBookIndex].style.transform = "none";
            bookCards[currentBookIndex].style.visibility = "visible"
            currentBookIndex++;
        }

        if (40 * currentPage - 1 < myLibrary.length) {
            currentBookIndex = deletedBookIndex;
            
            createCard(myLibrary[lastBook])

            handleRefreshOfBookIndex(bookNumber, currentBookIndex, lastBook + 1);
        }
    }, 650)
}



// Reads checkbox for checked or not checked and sets the book to read or not read in the myLibrary array
function handleIsReadCheckbox(book) {

    const bookTarget = book.target.parentElement.parentElement.parentElement;
    const checkbox = book.target;

    if (checkbox.checked === false) {
        if (googleBooksArray.length === 0) myLibrary[bookTarget.dataset.bookindex].read = false;
        saveToLocalStorage();
        return;
    }

    if (googleBooksArray.length === 0) myLibrary[bookTarget.dataset.bookindex].read = true;
    saveToLocalStorage();
}






/** Animations */

// Handles animation of the menu button
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