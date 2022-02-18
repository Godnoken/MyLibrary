import { myLibraryArray } from "./index.js";
import { handleRefreshOfBookIndex } from "./handleRefreshOfBookIndex.js";
import { displayBooks } from "./displayBooks.js";
import { handlePageChange } from "./handlePages.js";
import { saveData } from "./handleData.js";

let bookCards;

// Deletes book from display and myLibraryArray array with smooth animations. Saves to local storage.
export function handleDeleteBook() {
    let selectedBook = this.parentElement.parentElement.parentElement;



    // Updates variable tracking cards of displayed books
    bookCards = document.querySelectorAll(".card");

    smoothBookDeletion(selectedBook);
    
    saveData("allBooks");
}

function smoothBookDeletion(selectedBook) {
    let selectedBooksArrayIndex = Number(selectedBook.dataset.bookindex);
    let lastDisplayedBook = Number(bookCards[bookCards.length - 1].dataset.bookindex);
    let selectedBooksElementIndex;

    selectedBook.classList.toggle("hide");

    // Finding the "element index" by searching through the nodelist of currently displayed books
    // And making all card uninteractive when books are animating after book deletion
    for (let i = 0; i < bookCards.length; i++) {
        if (bookCards[i] === selectedBook) selectedBooksElementIndex = i;
        bookCards[i].style.pointerEvents = "none";
    }

    // Variable that lets us update and animate only the books following after the deleted book
    let currentBookToUpdate = selectedBooksElementIndex + 1;

    for (let i = selectedBooksArrayIndex; i < lastDisplayedBook; i++) {

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

        handlePageChange();
        displayBooks(undefined, myLibraryArray);

        // Above handlePageChange and displayBooks are ineffecient but they eliminate several bugs
        // If I find a way to only delete one card without having to recreate all cards, the if statement below will be used
        // Note, bugs only appeared due to page changes back and forth after deletion. Test previous commits to recreate bugs
        /**
         if (40 * global.currentPage - 1 < myLibraryArray.length) {
         }
         */
    }, 650)
}