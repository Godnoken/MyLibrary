import { global } from "./main.js";
import { handleMenuAnimation } from "./animations.js";
import { displayBooks, googleBooksArray } from "./displayBooks.js";

export function showMyLibrary() {
    global.startIndex = 0;
    global.currentPage = 1;
    googleBooksArray.length = 0;
    google.value = "";
    addBookButton.style.visibility = "visible";

    handleMenuAnimation();
    displayBooks();
}