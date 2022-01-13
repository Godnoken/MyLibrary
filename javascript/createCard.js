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
    const flipCardBackImg = document.createElement("img");
    const isReadCheckbox = document.createElement("input");
    const title = document.createElement("p");
    const authors = document.createElement("p");
    const pageCount = document.createElement("p");
    const bookDetails = document.createElement("div");

    card.classList.add("card");
    flipCardInner.classList.add("flipCardInner");
    flipCardFront.classList.add("flipCardFront");
    flipCardBack.classList.add("flipCardBack");
    bookDetails.classList.add("bookDetails");
    isReadCheckbox.classList.add("isReadCheckbox");

    isReadCheckbox.addEventListener("click", handleIsReadCheckbox);

    card.setAttribute("data-bookindex", myLibraryArray.indexOf(book));
    isReadCheckbox.type = "checkbox";


    flipCardBack.appendChild(bookDetails);
    flipCardBack.appendChild(title);
    flipCardBack.appendChild(authors);
    flipCardBack.appendChild(pageCount);
    //flipCardBack.appendChild(isReadCheckbox);


    
    
    // If user made a google search
    if (googleBooksArray.length !== 0) {
        if (book.hasOwnProperty("imageLinks")) {
            flipCardFront.style.backgroundImage = `url(${book["imageLinks"]["thumbnail"]})`;
            flipCardBackImg.src = book["imageLinks"]["thumbnail"];
        }
        
        title.textContent = book.title === undefined ? `Title: Unknown` : `Title: ${book.title}`;
        authors.textContent = book.authors === undefined ? `Author: Unknown` : `Author: ${book.authors}`;
        pageCount.textContent = book.pageCount === undefined ? `Pages: Unknown` : `Pages: ${book.pageCount}`;

        const addGoogleBook = document.createElement("button");
        addGoogleBook.classList.add("button");
        addGoogleBook.textContent = "Add Book";
        addGoogleBook.addEventListener("click", addGoogleBookToLibrary);

        flipCardBack.appendChild(addGoogleBook);

    }

    // If user clicked on "My Library"
    else {

        flipCardBackImg.src = book.backgroundImage;
        
        if (Object.values(book)[3] !== "") flipCardFront.style.backgroundImage = `url(${book.backgroundImage})`;
        
        title.textContent = `Title: ${book.title}`;
        authors.textContent = `Author: ${book.authors}`;
        pageCount.textContent = `Pages: ${book.pageCount}`;
        
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
    flipCardBack.appendChild(flipCardBackImg);
    
    book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
}