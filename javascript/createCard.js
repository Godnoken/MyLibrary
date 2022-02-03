import { myLibraryArray } from "./main.js";
import { handleDeleteBook } from "./handleDeletionOfBook.js";
import { addGoogleBookToLibrary } from "./addBook.js";
import { handleIsReadCheckbox } from "./handleIsReadCheckBox.js";
import { googleBooksArray } from "./displayBooks.js";
import { handleHiddenCardText, handleCopiedTextbox } from "./animations.js";
import { createBookForm, handleOptionsMenu } from "./options.js";

export function createCard(book) {
    const card = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardFrontImg = document.createElement("img");
    const flipCardBack = document.createElement("div");
    const flipCardBackImg = document.createElement("img");
    const isReadCheckboxLabel = document.createElement("label");
    const isReadCheckbox = document.createElement("input");
    let title = document.createElement("p");
    let authors = document.createElement("p");
    const pageCount = document.createElement("p");
    const flipCardBackColouredBackground = document.createElement("div");

    card.classList.add("card");
    flipCardInner.classList.add("flipCardInner");
    flipCardFront.classList.add("flipCardFront");
    flipCardFrontImg.classList.add("flipCardFrontImg");
    flipCardBack.classList.add("flipCardBack");
    flipCardBackImg.classList.add("flipCardBackImg");
    isReadCheckboxLabel.classList.add("isReadCheckboxLabel");
    isReadCheckbox.classList.add("isReadCheckbox");
    flipCardBackColouredBackground.classList.add("flipCardBackColouredBackground");
    title.classList.add("cardParagraphs");
    authors.classList.add("cardParagraphs");
    pageCount.classList.add("cardParagraphs");

    isReadCheckbox.addEventListener("click", handleIsReadCheckbox);
    card.addEventListener("mouseover", handleHiddenCardText);
    title.addEventListener("click", handleCopiedTextbox);
    authors.addEventListener("click", handleCopiedTextbox);

    // Listeners for improving rendering performance
    let doNotRender;

    card.addEventListener("mouseenter", () => {
        // Makes sure setTimeout doesn't override the mouseenter style changes
        clearTimeout(doNotRender);
        flipCardBack.style.contentVisibility = "visible";
        flipCardBack.style.visibility = "visible";
    })

    card.addEventListener("mouseleave", () => {
        doNotRender = setTimeout(() => {
        flipCardBack.style.contentVisibility = "hidden";
        flipCardBack.style.visibility = "hidden";
        }, 650);
    })

    card.setAttribute("data-bookindex", myLibraryArray.indexOf(book));
    flipCardFrontImg.setAttribute("loading", "lazy");
    flipCardFrontImg.setAttribute("alt", "Book cover");
    flipCardBackImg.setAttribute("loading", "lazy");
    flipCardBackImg.setAttribute("alt", "Book cover");
    isReadCheckbox.type = "checkbox";
    if (book.read === true) isReadCheckboxLabel.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.5 2.5c.9-.7 2.1-.7 3 0l6.7 5.7c.5.5.8 1 .8 1.8v9.7c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V10c0-.7.3-1.3.8-1.8l6.7-5.7Zm2 1.2a.8.8 0 0 0-1 0L4.8 9.4c-.2.1-.3.3-.3.6v9.7c0 .2.1.3.3.3h14.4c.2 0 .3-.1.3-.3V10c0-.3-.1-.5-.3-.6l-6.7-5.7Z"/><path d="M15.8 10.7c.3.3.3.8 0 1l-4.5 4.6a.8.8 0 0 1-1 0l-2-2a.8.8 0 0 1 1-1l1.4 1.4 4-4c.3-.3.8-.3 1 0Z"/></svg>';
    else isReadCheckboxLabel.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.5 2.5c.9-.7 2.1-.7 3 0l6.7 5.7c.5.5.8 1 .8 1.8v9.7c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V10c0-.7.3-1.3.8-1.8l6.7-5.7Zm2 1.2a.8.8 0 0 0-1 0L4.8 9.4c-.2.1-.3.3-.3.6v9.7c0 .2.1.3.3.3h14.4c.2 0 .3-.1.3-.3V10c0-.3-.1-.5-.3-.6l-6.7-5.7Z"/></svg>';

    flipCardFront.appendChild(flipCardFrontImg);
    flipCardBack.appendChild(flipCardBackColouredBackground);
    flipCardBack.appendChild(title);
    flipCardBack.appendChild(authors);
    flipCardBack.appendChild(pageCount);
    flipCardBack.appendChild(isReadCheckboxLabel);
    isReadCheckboxLabel.appendChild(isReadCheckbox);
    
    // If user made a google search
    if (googleBooksArray.length !== 0) {
        if (book.hasOwnProperty("imageLinks")) {
            flipCardFrontImg.src = book.imageLinks.thumbnail;
            flipCardBackImg.src = book.imageLinks.thumbnail;
        }
        
        title.textContent = book.title === undefined ? `Title: Unknown` : `Title: ${book.title}`;
        authors.textContent = book.authors === undefined ? `Author: Unknown` : `Author: ${book.authors}`;
        pageCount.textContent = book.pageCount === undefined ? `Pages: Unknown` : `Pages: ${book.pageCount}`;

        const addBookContainer = document.createElement("div");
        const addBook = document.createElement("div");
        addBook.textContent = "+";
        addBookContainer.classList.add("topLeftBookContainer");
        addBook.classList.add("topLeftBookSymbol");
        addBookContainer.addEventListener("click", addGoogleBookToLibrary);
        flipCardBack.appendChild(addBookContainer);
        addBookContainer.appendChild(addBook);
    }

    // If user clicked on "My Library"
    else {

        if (Object.values(book)[3] !== "") {
            flipCardFrontImg.src = book.backgroundImage;
            flipCardBackImg.src = book.backgroundImage;
        }

        title.textContent = `Title: ${book.title}`;
        authors.textContent = `Author: ${book.authors}`;
        pageCount.textContent = `Pages: ${book.pageCount}`;
        
        const removeBookContainer = document.createElement("div");
        const removeBook = document.createElement("div");
        removeBook.textContent = "+";
        removeBookContainer.classList.add("topRightBookContainer");
        removeBook.classList.add("topRightBookSymbol");
        removeBookContainer.addEventListener("click", handleDeleteBook);
        flipCardBack.appendChild(removeBookContainer);
        removeBookContainer.appendChild(removeBook);

        const editBookContainer = document.createElement("div");
        editBookContainer.classList.add("topLeftBookContainer", "editBookButton");
        flipCardBack.appendChild(editBookContainer);
        editBookContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217.9 217.9"><path d="M216 54 164 2a8 8 0 0 0-10 0L4 152c-2 1-2 3-2 5l-2 53a8 8 0 0 0 8 8l53-2 5-2L216 64c3-3 3-8 0-10zM57 201l-42 2 2-42 91-92 40 41-91 91zm102-101-41-41 41-41 41 41-41 41z"/></svg>';
        const editBook = editBookContainer.childNodes[0];
        editBook.classList.add("topLeftBookSymbol");

        editBookContainer.addEventListener("click", () => {
            handleOptionsMenu(createBookForm, ".editBookFormContainer");
        })
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