import { myLibraryArray } from "./main.js";
import { createCard } from "./createCard.js";
import { handleAddBookAnimation } from "./animations.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";
import { Book } from "./constructors.js";

const bookForm = window.document.querySelector("#bookForm");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#formPages");
const bookCover = document.querySelector("#bookCover");
const bookRead = document.querySelector("#read");

export function addBook(event) {

    // Prevents reloading of the page
    event.preventDefault();

    for (let i = 0; i < bookForm.length - 2; i++) {
        if (bookForm.children[i].value !== "") {

            // Adds new book to array
            const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookCover.value, bookRead.checked);
            myLibraryArray.push(bookToAdd);

            // Creates card for the new book and renders it on the page
            let book = myLibraryArray[myLibraryArray.length - 1];
            createCard(book);

            // Removes bookForm from screen
            handleAddBookAnimation();

            saveToLocalStorage();
            return;
        }
    }

    alert("Need user input!")
}

export function addGoogleBookToLibrary(event) {
    const googleBook = event.target.parentElement;
    const title = googleBook.childNodes[1].textContent.slice(7);
    const authors = googleBook.childNodes[2].textContent.slice(8);
    const pageCount = googleBook.childNodes[3].textContent.slice(7);

    const googleBookBackgroundImage = googleBook.previousElementSibling.style.backgroundImage.slice(5, -2);

    const bookToAdd = new Book(title, authors, pageCount, googleBookBackgroundImage, googleBook.childNodes[4].checked);

    myLibraryArray.push(bookToAdd);

    saveToLocalStorage();
}