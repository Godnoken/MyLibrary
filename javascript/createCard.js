import { myLibraryArray } from "./main.js";
import { handleDeleteBook } from "./handleDeletionOfBook.js";
import { addGoogleBookToLibrary } from "./addBook.js";
import { handleIsReadCheckbox } from "./handleIsReadCheckBox.js";
import { googleBooksArray } from "./displayBooks.js";
import { handleHiddenCardText, handleCopiedTextbox } from "./animations.js";

export function createCard(book) {
    const card = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");
    const flipCardBackImg = document.createElement("img");
    const isReadCheckbox = document.createElement("input");
    let title = document.createElement("p");
    let authors = document.createElement("p");
    const pageCount = document.createElement("p");
    const flipCardBackColouredBackground = document.createElement("div");

    card.classList.add("card");
    flipCardInner.classList.add("flipCardInner");
    flipCardFront.classList.add("flipCardFront");
    flipCardBack.classList.add("flipCardBack");
    isReadCheckbox.classList.add("isReadCheckbox");
    flipCardBackColouredBackground.classList.add("flipCardBackColouredBackground");
    title.classList.add("cardParagraphs");
    authors.classList.add("cardParagraphs");
    pageCount.classList.add("cardParagraphs");

    isReadCheckbox.addEventListener("click", handleIsReadCheckbox);
    card.addEventListener("mouseover", handleHiddenCardText);
    title.addEventListener("click", handleCopiedTextbox);
    authors.addEventListener("click", handleCopiedTextbox);

    card.setAttribute("data-bookindex", myLibraryArray.indexOf(book));
    isReadCheckbox.type = "checkbox";

    flipCardBack.appendChild(flipCardBackColouredBackground);
    flipCardBack.appendChild(title);
    flipCardBack.appendChild(authors);
    flipCardBack.appendChild(pageCount);
    //flipCardBack.appendChild(isReadCheckbox);
    
    // If user made a google search
    if (googleBooksArray.length !== 0) {
        if (book.hasOwnProperty("imageLinks")) {
            flipCardFront.style.backgroundImage = `url(${book["imageLinks"]["thumbnail"]})`;
            flipCardBackImg.src = book["imageLinks"]["thumbnail"];
            flipCardBackImg.setAttribute("alt", "Book cover");
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

        if (Object.values(book)[3] !== "") {
            flipCardFront.style.backgroundImage = `url(${book.backgroundImage})`;
            flipCardFront.setAttribute("title", "Book cover");

            flipCardBackImg.src = book.backgroundImage;
            flipCardBackImg.setAttribute("alt", "Book cover");
        }

        title.textContent = `Title: ${book.title}`;
        authors.textContent = `Author: ${book.authors}`;
        pageCount.textContent = `Pages: ${book.pageCount}`;
        
        const removeBookContainer = document.createElement("div");
        const removeBook = document.createElement("p");
        removeBook.textContent = "x";
        removeBookContainer.classList.add("removeBookContainer");
        removeBook.classList.add("removeBook");
        removeBookContainer.addEventListener("click", handleDeleteBook);
        flipCardBack.appendChild(removeBookContainer);
        removeBookContainer.appendChild(removeBook);
    }

    authors.textContent = authors.textContent.replace(/,(?=[^\s])/g, ", ");

    let hiddenTitleText = title.textContent.slice(35);
    title.textContent = title.textContent.slice(0, 35);
    let hiddenAuthorsText = authors.textContent.slice(35);
    authors.textContent = authors.textContent.slice(0, 35);


    title.innerHTML = `${title.textContent}<span>${hiddenTitleText}</span>`;
    authors.innerHTML = `${authors.textContent}<span>${hiddenAuthorsText}</span>`;
    
    booksDisplay.appendChild(card);
    card.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.appendChild(flipCardBackImg);
    
    book.read === true ? isReadCheckbox.checked = true : isReadCheckbox.checked = false;
}