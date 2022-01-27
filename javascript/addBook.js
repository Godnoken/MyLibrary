import { myLibraryArray } from "./main.js";
import { saveLibraryToLocalStorage } from "./saveToLocalStorage.js";
import { Book } from "./constructors.js";
import { displayBooks } from "./displayBooks.js";
import { handlePageChange } from "./handlePages.js";
import { handleRefreshOfBookIndex } from "./handleRefreshOfBookIndex.js";


export function addBook(event) {
    const bookTitle = document.querySelector("#addBookTitle");
    const bookAuthor = document.querySelector("#addBookAuthor");
    const bookPages = document.querySelector("#addBookPages");
    const bookCover = document.querySelector("#addBookCover");
    const bookRead = document.querySelector("#addBookRead");

    // Prevents reloading of the page
    event.preventDefault();

    // Adds new book to array
    const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookCover.value, bookRead.checked);
    myLibraryArray.push(bookToAdd);

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookCover.value = "";
    bookRead.checked = false;

    // Creates card for the new book and renders it on the page
    let book = myLibraryArray[myLibraryArray.length - 1];
    
    handleRefreshOfBookIndex(book, book, book);
    handlePageChange();
    displayBooks(undefined, myLibraryArray);
    
    saveLibraryToLocalStorage();
}

export function addGoogleBookToLibrary(event) {
    const googleBook = event.target.parentElement;
    const title = googleBook.childNodes[1].textContent.slice(7);
    const authors = googleBook.childNodes[2].textContent.slice(8);
    const pageCount = googleBook.childNodes[3].textContent.slice(7);

    const googleBookBackgroundImage = googleBook.previousElementSibling.style.backgroundImage.slice(5, -2);

    const bookToAdd = new Book(title, authors, pageCount, googleBookBackgroundImage, googleBook.childNodes[4].checked);

    myLibraryArray.push(bookToAdd);

    saveLibraryToLocalStorage();
}