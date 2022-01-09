import { myLibraryArray } from "./main.js";
import { googleBooksArray } from "./displayBooks.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";

// Reads checkbox for checked or not checked and sets the book to read or not read in the myLibraryArray, googleBooksArray array
export function handleIsReadCheckbox(book) {

    const bookTarget = book.target.parentElement.parentElement.parentElement;
    const checkbox = book.target;

    if (googleBooksArray.length === 0) {
        if (checkbox.checked === false) myLibraryArray, googleBooksArray[bookTarget.dataset.bookindex].read = false;
        else myLibraryArray, googleBooksArray[bookTarget.dataset.bookindex].read = true;
    }

    saveToLocalStorage();
}