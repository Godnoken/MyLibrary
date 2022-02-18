import { global } from "./index.js";
import { createCard } from "./createCard.js";
import { removeAllBooksFromDisplay } from "./removeAllFromDisplay.js";
import { createObserver } from "./isInViewport.js";

let bookCards = document.querySelectorAll(".card");

export let googleBooksArray = [];
let myLibraryArray = [];

// Creates card for all the books stored in the myLibraryArray array and renders them to the page
export function displayBooks(retrievedGoogleBooks, retrievedLibraryBooks) {

    if (retrievedGoogleBooks !== undefined) googleBooksArray = Array.from(retrievedGoogleBooks);
    if (retrievedLibraryBooks !== undefined) myLibraryArray = Array.from(retrievedLibraryBooks);

    removeAllBooksFromDisplay(bookCards);

    if (googleBooksArray.length !== 0) {
        for (let i = global.startIndex; i < global.startIndex + 40; i++) {
            if (googleBooksArray[i]) createCard(googleBooksArray[i])
        }
    }
    else {
        for (let i = global.startIndex; i < global.startIndex + 40; i++) {
            if (myLibraryArray[i]) createCard(myLibraryArray[i])
        }
    }

    // Sets the current page back to first page
    global.startIndex = 0;

    bookCards = document.querySelectorAll(".card");
    createObserver(bookCards);
}