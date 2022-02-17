import { global, myLibraryArray } from "./main.js";
import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { createPageNumbers } from "./handlePages.js";
import { handleSort } from "./handleSort.js";

const myLibraryButton = document.querySelector("#myLibrary");

myLibraryButton.addEventListener("click", showMyLibrary);

export function showMyLibrary() {
    global.startIndex = 0;
    global.currentPage = 1;
    googleBooksArray.length = 0;
    google.value = "";
    addBookButton.style.visibility = "visible";

    handleSort(myLibraryArray);
    createPageNumbers(myLibraryArray.length);
    displayBooks(undefined, myLibraryArray);
}