import { myLibraryArray } from "./main.js";
import { handleDeleteBook } from "./handleDeletionOfBook.js";
import { addGoogleBookToLibrary } from "./addBook.js";
import { handleIsReadCheckbox } from "./handleIsReadCheckBox.js";
import { googleBooksArray } from "./displayBooks.js";

export function createCard(book) {
    const card = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");
    const isReadCheckbox = document.createElement("input");

    card.classList.add("card");
    flipCardInner.classList.add("flipCardInner");
    flipCardFront.classList.add("flipCardFront");
    flipCardBack.classList.add("flipCardBack");
    isReadCheckbox.classList.add("isReadCheckbox");

    isReadCheckbox.addEventListener("click", handleIsReadCheckbox);

    card.setAttribute("data-bookindex", myLibraryArray.indexOf(book));
    isReadCheckbox.type = "checkbox";

    // If user made a google search
    if (googleBooksArray.length !== 0) {

        const title = document.createElement("p");
        const authors = document.createElement("p");
        const pageCount = document.createElement("p");

        title.textContent = `Title: ${book["volumeInfo"].title}`
        authors.textContent = `Author: ${book["volumeInfo"].authors}`
        pageCount.textContent = `Pages : ${book["volumeInfo"].pageCount}`

        flipCardBack.appendChild(title);
        flipCardBack.appendChild(authors);
        flipCardBack.appendChild(pageCount);
        flipCardBack.appendChild(isReadCheckbox);

        const addGoogleBook = document.createElement("button");
        addGoogleBook.textContent = "Add Book";
        addGoogleBook.addEventListener("click", addGoogleBookToLibrary);

        flipCardBack.appendChild(addGoogleBook);

        if (book["volumeInfo"].hasOwnProperty("imageLinks")) {
            flipCardFront.style.backgroundImage = `url(${book["volumeInfo"]["imageLinks"]["thumbnail"]})`;
        }
    }

    // If user clicked on "My Library"
    else {
        // Adds content to the book card only if user input something
        for (let i = 0; i < Object.values(book).length - 2; i++) {
            if (Object.values(book)[i] !== "") {
                const paragraph = document.createElement("p");
                paragraph.textContent = Object.values(book)[i];
                flipCardBack.appendChild(paragraph);
                flipCardBack.appendChild(isReadCheckbox);
            }
        }
        if (Object.values(book)[3] !== "") flipCardFront.style.backgroundImage = `url(${book.backgroundImage})`;

        const removeBook = document.createElement("div");
        removeBook.textContent = "X";
        removeBook.classList.add("removeBook");
        removeBook.addEventListener("click", handleDeleteBook);
        flipCardBack.appendChild(removeBook);
    }

    booksDisplay.appendChild(card);
    card.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
}