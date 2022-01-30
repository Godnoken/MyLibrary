/** Imports */

import { handleGoogleSearch } from "./google.js";
import { addBook } from "./addBook.js";
import { showMyLibrary } from "./showMyLibrary.js";
import { googleBooksArray } from "./displayBooks.js";
import { createDummyData } from "./dummyData.js";
import {  } from "./options.js";

/** Global Variables */

export let global = {
    currentPage: 1,
    startIndex: 0,
}

export let myLibraryArray = [];


/** Elements */

const google = document.querySelector("#google");
const googleButton = document.querySelector("#googleButton");
const myLibraryButton = document.querySelector("#myLibrary");


/** Event Listeners */

googleButton.addEventListener("click", () => { if (google.value !== "") handleGoogleSearch(global.startIndex, googleBooksArray) });
myLibraryButton.addEventListener("click", showMyLibrary);
window.addEventListener("load", () => { window. scrollTo(0, 0); });
document.addEventListener("touchmove", (event) => { event.preventDefault() });

/** Run at start */

// Creates local storage library if user enters website for the first time
if (JSON.parse(window.localStorage.getItem("userLibrary")) === null) window.localStorage.setItem("userLibrary", JSON.stringify([]));

// Makes sure myLibraryArray stays updated with local storage on load
if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) myLibraryArray = JSON.parse(window.localStorage.getItem("userLibrary"));

// Creates dummy data if no books exist in local storage
if (JSON.parse(window.localStorage.getItem("userLibrary")).length === 0) {
    createDummyData();
    setTimeout(() => {
        showMyLibrary();
    }, 1200);
}
else showMyLibrary();

