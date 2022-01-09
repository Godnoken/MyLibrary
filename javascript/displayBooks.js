import { global, myLibraryArray } from "./main.js";
import { createCard } from "./createCard.js";
import { createPageNumbers } from "./handlePages.js";
import { removeAllBooksFromDisplay } from "./removeAllFromDisplay.js";
import { isInViewport } from "./isInViewport.js";

let bookCards = document.querySelectorAll(".card");

export let googleBooksArray = [];

// Creates card for all the books stored in the myLibraryArray array and renders them to the page
export function displayBooks(retrievedGoogleBooks) {

    if (retrievedGoogleBooks !== undefined) googleBooksArray = Array.from(retrievedGoogleBooks);

    removeAllBooksFromDisplay(bookCards);

    if (googleBooksArray.length !== 0) {
        for (let i = global.startIndex; i < global.startIndex + 40; i++) {
            if (googleBooksArray[i]) createCard(googleBooksArray[i])
        }
        createPageNumbers(googleBooksArray.length);
    }
    else {
        for (let i = global.startIndex; i < global.startIndex + 40; i++) {
            if (myLibraryArray[i]) createCard(myLibraryArray[i])
        }
        createPageNumbers(myLibraryArray.length);
    }

    // Sets the current page back to first page
    global.startIndex = 0;

    bookCards = document.querySelectorAll(".card");

    bookCards.forEach(book => {
        if (isInViewport(book) === false) book.style.visibility = "hidden";
    })
}