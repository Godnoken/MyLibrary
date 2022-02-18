import { myLibraryArray } from "./index.js";
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
        else {
            flipCardFront.innerHTML = 'IMAGE NOT<br>AVAILABLE<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470"><path d="M271 127.09v65.2a7.5 7.5 0 1 0 15 0v-65.2a7.5 7.5 0 1 0-15 0zM467.8 435.98l-58.54-58.54a7.5 7.5 0 0 0-10.6 0l-5.3 5.3-10.85-10.84A97.08 97.08 0 0 0 406 308.5c0-53.76-43.74-97.5-97.5-97.5S211 254.74 211 308.5s43.74 97.5 97.5 97.5a97.08 97.08 0 0 0 63.4-23.5l10.85 10.85-5.3 5.3a7.5 7.5 0 0 0 0 10.61l58.53 58.54a7.48 7.48 0 0 0 10.61 0l21.21-21.21a7.5 7.5 0 0 0 0-10.6zM226 308.5c0-45.5 37-82.5 82.5-82.5s82.5 37 82.5 82.5-37.01 82.5-82.5 82.5-82.5-37.01-82.5-82.5zm215.29 143.4-47.94-47.94 5.3-5.3 5.3-5.31 47.94 47.94-10.6 10.6z"/><path d="M229.22 391H15V15h196.41v82.09a7.5 7.5 0 0 0 7.5 7.5H301v83.9a7.5 7.5 0 1 0 15 0V97.1c0-.25-.02-.5-.04-.75l-.08-.55-.03-.18a7.3 7.3 0 0 0-.16-.63l-.02-.08a7.36 7.36 0 0 0-.22-.62l-.03-.07c-.08-.2-.17-.38-.26-.57l-.05-.1-.3-.5-.08-.12c-.1-.16-.21-.3-.33-.45l-.1-.14c-.15-.18-.3-.34-.46-.5l-.04-.05L224.21 2.2l-.05-.06a7.5 7.5 0 0 0-.49-.44l-.17-.12c-.14-.1-.27-.22-.42-.31l-.15-.1c-.16-.1-.32-.2-.48-.28l-.11-.05c-.18-.1-.36-.19-.55-.27l-.08-.02c-.2-.08-.4-.16-.61-.22l-.08-.03-.63-.15-.2-.03a7.2 7.2 0 0 0-1.28-.12H7.5A7.5 7.5 0 0 0 0 7.5v391a7.5 7.5 0 0 0 7.5 7.5h221.72a7.5 7.5 0 1 0 0-15zm-2.8-365.4 63.97 63.99h-63.98V25.6z"/><path d="M308.5 241c-37.22 0-67.5 30.28-67.5 67.5s30.28 67.5 67.5 67.5 67.5-30.28 67.5-67.5-30.28-67.5-67.5-67.5zm0 120c-28.95 0-52.5-23.55-52.5-52.5s23.55-52.5 52.5-52.5 52.5 23.55 52.5 52.5-23.55 52.5-52.5 52.5zM112.11 191.4l63.2 66.68a7.5 7.5 0 0 0 10.88 0l43.92-46.34 3.73 3.94a7.5 7.5 0 1 0 10.89-10.31l-9.18-9.7a7.5 7.5 0 0 0-10.89 0l-43.91 46.35-63.2-66.68a7.5 7.5 0 0 0-10.88 0l-74.61 78.73a7.5 7.5 0 0 0-2.06 5.16V368.5a7.5 7.5 0 0 0 7.5 7.5h167.1a7.5 7.5 0 1 0 0-15H45v-98.78l67.11-70.81z"/><path d="M149.15 160.87c0 17.42 14.17 31.6 31.6 31.6s31.6-14.18 31.6-31.6-14.18-31.6-31.6-31.6-31.6 14.17-31.6 31.6zm48.2 0c0 9.15-7.45 16.6-16.6 16.6-9.16 0-16.6-7.45-16.6-16.6s7.44-16.6 16.6-16.6c9.15 0 16.6 7.44 16.6 16.6zM188.91 30H37.5a7.5 7.5 0 0 0-7.5 7.5v178.12a7.5 7.5 0 1 0 15 0V45h143.91a7.5 7.5 0 1 0 0-15z"/></svg>';
            flipCardBackImg.remove();
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
        
        flipCardFrontImg.src = book.backgroundImage;
        flipCardBackImg.src = book.backgroundImage;

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

    flipCardFrontImg.onerror = () => {
        flipCardFront.innerHTML = 'IMAGE<br>NOT<br>AVAILABLE<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470"><path d="M271 127.09v65.2a7.5 7.5 0 1 0 15 0v-65.2a7.5 7.5 0 1 0-15 0zM467.8 435.98l-58.54-58.54a7.5 7.5 0 0 0-10.6 0l-5.3 5.3-10.85-10.84A97.08 97.08 0 0 0 406 308.5c0-53.76-43.74-97.5-97.5-97.5S211 254.74 211 308.5s43.74 97.5 97.5 97.5a97.08 97.08 0 0 0 63.4-23.5l10.85 10.85-5.3 5.3a7.5 7.5 0 0 0 0 10.61l58.53 58.54a7.48 7.48 0 0 0 10.61 0l21.21-21.21a7.5 7.5 0 0 0 0-10.6zM226 308.5c0-45.5 37-82.5 82.5-82.5s82.5 37 82.5 82.5-37.01 82.5-82.5 82.5-82.5-37.01-82.5-82.5zm215.29 143.4-47.94-47.94 5.3-5.3 5.3-5.31 47.94 47.94-10.6 10.6z"/><path d="M229.22 391H15V15h196.41v82.09a7.5 7.5 0 0 0 7.5 7.5H301v83.9a7.5 7.5 0 1 0 15 0V97.1c0-.25-.02-.5-.04-.75l-.08-.55-.03-.18a7.3 7.3 0 0 0-.16-.63l-.02-.08a7.36 7.36 0 0 0-.22-.62l-.03-.07c-.08-.2-.17-.38-.26-.57l-.05-.1-.3-.5-.08-.12c-.1-.16-.21-.3-.33-.45l-.1-.14c-.15-.18-.3-.34-.46-.5l-.04-.05L224.21 2.2l-.05-.06a7.5 7.5 0 0 0-.49-.44l-.17-.12c-.14-.1-.27-.22-.42-.31l-.15-.1c-.16-.1-.32-.2-.48-.28l-.11-.05c-.18-.1-.36-.19-.55-.27l-.08-.02c-.2-.08-.4-.16-.61-.22l-.08-.03-.63-.15-.2-.03a7.2 7.2 0 0 0-1.28-.12H7.5A7.5 7.5 0 0 0 0 7.5v391a7.5 7.5 0 0 0 7.5 7.5h221.72a7.5 7.5 0 1 0 0-15zm-2.8-365.4 63.97 63.99h-63.98V25.6z"/><path d="M308.5 241c-37.22 0-67.5 30.28-67.5 67.5s30.28 67.5 67.5 67.5 67.5-30.28 67.5-67.5-30.28-67.5-67.5-67.5zm0 120c-28.95 0-52.5-23.55-52.5-52.5s23.55-52.5 52.5-52.5 52.5 23.55 52.5 52.5-23.55 52.5-52.5 52.5zM112.11 191.4l63.2 66.68a7.5 7.5 0 0 0 10.88 0l43.92-46.34 3.73 3.94a7.5 7.5 0 1 0 10.89-10.31l-9.18-9.7a7.5 7.5 0 0 0-10.89 0l-43.91 46.35-63.2-66.68a7.5 7.5 0 0 0-10.88 0l-74.61 78.73a7.5 7.5 0 0 0-2.06 5.16V368.5a7.5 7.5 0 0 0 7.5 7.5h167.1a7.5 7.5 0 1 0 0-15H45v-98.78l67.11-70.81z"/><path d="M149.15 160.87c0 17.42 14.17 31.6 31.6 31.6s31.6-14.18 31.6-31.6-14.18-31.6-31.6-31.6-31.6 14.17-31.6 31.6zm48.2 0c0 9.15-7.45 16.6-16.6 16.6-9.16 0-16.6-7.45-16.6-16.6s7.44-16.6 16.6-16.6c9.15 0 16.6 7.44 16.6 16.6zM188.91 30H37.5a7.5 7.5 0 0 0-7.5 7.5v178.12a7.5 7.5 0 1 0 15 0V45h143.91a7.5 7.5 0 1 0 0-15z"/></svg>';
        flipCardBackImg.remove();
    };

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