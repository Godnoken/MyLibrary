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

    flipCardFront.appendChild(flipCardFrontImg);
    flipCardBack.appendChild(flipCardBackColouredBackground);
    flipCardBack.appendChild(title);
    flipCardBack.appendChild(authors);
    flipCardBack.appendChild(pageCount);
    //flipCardBack.appendChild(isReadCheckbox);
    
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

        const color = getComputedStyle(document.documentElement);
        editBook.style.fill = color.getPropertyValue('--main-text-color');

        editBookContainer.addEventListener("mouseenter", () => {
            editBook.style.fill = color.getPropertyValue('--secondary-text-color');
        })

        editBookContainer.addEventListener("mouseleave", () => {
            editBook.style.fill = color.getPropertyValue('--main-text-color');
        })

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