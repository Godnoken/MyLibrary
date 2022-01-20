import { myLibraryArray, global } from "./main.js";
import { createCard } from "./createCard.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";
import { handleRefreshOfBookIndex } from "./handleRefreshOfBookIndex.js";

let bookCards;

// Deletes book from display and myLibraryArray array with smooth animations. Saves to local storage.
export function handleDeleteBook() {
    let selectedBook = this.parentElement.parentElement.parentElement;

    // Updates variable tracking cards of displayed books
    bookCards = window.document.querySelectorAll(".card");

    smoothBookDeletion(selectedBook);

    saveToLocalStorage();
}

function smoothBookDeletion(selectedBook) {
    let selectedBooksArrayIndex = Number(selectedBook.dataset.bookindex);
    let lastDisplayedBook = Number(bookCards[bookCards.length - 1].dataset.bookindex);
    let selectedBooksElementIndex;

    selectedBook.classList.toggle("hide");

    // Finding the "element index" by searching through the nodelist of currently displayed books
    for (let i = 0; i < bookCards.length; i++) {
        if (bookCards[i] === selectedBook) selectedBooksElementIndex = i;
    }

    // Variable that lets us update and animate only the books following after the deleted book
    let currentBookToUpdate = selectedBooksElementIndex + 1;

    for (let i = selectedBooksArrayIndex; i < lastDisplayedBook; i++) {
        bookCards[currentBookToUpdate].style.transitionDuration = "0.65s";

        // Reading book position and animating it
        let cardPosition = bookCards[currentBookToUpdate].getBoundingClientRect();
        let previousCardPosition = bookCards[currentBookToUpdate].previousElementSibling.getBoundingClientRect();
        bookCards[currentBookToUpdate].style.transform = `translate(${previousCardPosition.x - cardPosition.x}px, ${previousCardPosition.y - cardPosition.y}px)`;

        currentBookToUpdate++;
    }

    // Deletes book from array
    myLibraryArray.splice(selectedBook.dataset.bookindex, 1)

    // After 0.65s, delete book from DOM, refresh indexes and pop in a new card at the end if another page exists after the currently displayed one
    setTimeout(() => {
        selectedBook.remove()
        currentBookToUpdate = selectedBooksElementIndex;
        handleRefreshOfBookIndex(selectedBooksArrayIndex, currentBookToUpdate, lastDisplayedBook);
        bookCards = window.document.querySelectorAll(".card");

        // Hack to create the illusion that the cards don't move after animmation because of grid layout
        for (let i = selectedBooksArrayIndex; i < lastDisplayedBook; i++) {
            bookCards[currentBookToUpdate].style.transitionDuration = "0.00000001s";
            bookCards[currentBookToUpdate].style.transform = "none";
            bookCards[currentBookToUpdate].style.visibility = "visible"
            currentBookToUpdate++;
        }

        if (40 * global.currentPage - 1 < myLibraryArray.length) {
            currentBookToUpdate = selectedBooksElementIndex;

            createCard(myLibraryArray[lastDisplayedBook])

            handleRefreshOfBookIndex(selectedBooksArrayIndex, currentBookToUpdate, lastDisplayedBook + 1);
        }
    }, 650)
}