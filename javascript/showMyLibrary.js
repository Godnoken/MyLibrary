import { global, myLibraryArray } from "./main.js";
import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { createPageNumbers } from "./handlePages.js";

export function showMyLibrary() {
    global.startIndex = 0;
    global.currentPage = 1;
    googleBooksArray.length = 0;
    google.value = "";
    addBookButton.style.visibility = "visible";

    createPageNumbers(myLibraryArray.length);
    //if (document.querySelector("#menu").className === "activeMenu") handleMenuAnimation();
    displayBooks();
}