import { myLibraryArray } from "./index.js";
import { googleBooksArray } from "./displayBooks.js";
import { saveData } from "./handleData.js";

// Reads checkbox for checked or not checked and sets the book to read or not read in the myLibraryArray array
export function handleIsReadCheckbox(book) {

    const bookTarget = book.target.parentElement.parentElement.parentElement.parentElement;
    const checkbox = book.target;
    const checkmark = checkbox.previousElementSibling.children[1];
    const SVGcontainer = checkbox.previousElementSibling;

    if (checkbox.checked === false) checkmark.remove();
    else SVGcontainer.innerHTML = SVGcontainer.innerHTML + '<path d="M15.8 10.7c.3.3.3.8 0 1l-4.5 4.6a.8.8 0 0 1-1 0l-2-2a.8.8 0 0 1 1-1l1.4 1.4 4-4c.3-.3.8-.3 1 0Z"/>'

    if (googleBooksArray.length === 0) {
        if (checkbox.checked === false) myLibraryArray[bookTarget.dataset.bookindex].read = false;
        else  myLibraryArray[bookTarget.dataset.bookindex].read = true;
    }

    saveData("book", {read: checkbox.checked}, bookTarget.dataset.bookindex);
}