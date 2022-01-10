/** Imports */

import { handleGoogleSearch } from "./google.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";
import { } from "./cardsVisibility.js";
import { addBook } from "./addBook.js";
import { showMyLibrary } from "./showMyLibrary.js";
import { googleBooksArray } from "./displayBooks.js";
import { createDummyData } from "./dummyData.js";


/** Global Variables */

export let global = {
    currentPage: 1,
    startIndex: 0,
}

export let myLibraryArray = [];


/** Elements */

const bookFormSubmit = document.querySelector("#bookFormSubmit")
const google = document.querySelector("#google");
const googleButton = document.querySelector("#googleButton");
const myLibraryButton = document.querySelector("#myLibrary");


/** Event Listeners */

googleButton.addEventListener("click", () => { if (google.value !== "") handleGoogleSearch(global.startIndex, googleBooksArray) });
myLibraryButton.addEventListener("click", showMyLibrary);
bookFormSubmit.addEventListener("click", addBook);


/** Run at start */
createDummyData();

// Resets dummy data if user removes all books and reloads page. Used for testing only
if (window.localStorage.length === 0) window.localStorage.setItem("userLibrary", JSON.stringify([]))

// Makes sure myLibraryArray stays updated with local storage on load
if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) myLibraryArray = JSON.parse(window.localStorage.getItem("userLibrary"));
saveToLocalStorage();

showMyLibrary();