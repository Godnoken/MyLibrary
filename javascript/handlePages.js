import { global } from "./main.js";
import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { removeAllPageNumbersFromDisplay } from "./removeAllFromDisplay.js";

let pageNumbers = document.querySelector("#pages").childNodes;

export function createPageNumbers(amountOfBooks) {
    let pagesToCreate = 0;
    let pagesToCreateForGoogle = 0;

    removeAllPageNumbersFromDisplay(pageNumbers);

    for (let i = 0; i < amountOfBooks; i += 40) {
        pagesToCreate++;
        if (i < 400) pagesToCreateForGoogle++;
    }

    if (googleBooksArray.length !== 0) {
        for (let i = 1; i < pagesToCreateForGoogle + 1; i++) {
            const pageNumberButton = document.createElement("p");
            pageNumberButton.textContent = i;
            pages.appendChild(pageNumberButton);
        }
    }
    else {
        for (let i = 1; i < pagesToCreate + 1; i++) {
            const pageNumberButton = document.createElement("p");
            pageNumberButton.textContent = i;
            pages.appendChild(pageNumberButton);
        }
    }

    pageNumbers[0].classList.toggle("activePage");

    pageNumbers.forEach(page => page.addEventListener("click", (event) => {
        handlePageChange(event);
        pageNumbers.forEach(page => {
            if (page.className === "activePage") page.classList.toggle("activePage");
        })
        page.classList.toggle("activePage");
    }));

    const nextListOfPagesButton = document.createElement("p");
    const previousListOfPagesButton = document.createElement("p");
    nextListOfPagesButton.textContent = ">";
    previousListOfPagesButton.textContent = "<";
    nextListOfPagesButton.id = "nextPageList";
    previousListOfPagesButton.id = "previousPageList";
    //nextListOfPagesButton.addEventListener("click", () => handleListOfPagesChange("next", pagesToCreate));
    //previousListOfPagesButton.addEventListener("click", () => handleListOfPagesChange("previous", pagesToCreate));
    pages.appendChild(nextListOfPagesButton);
    pages.prepend(previousListOfPagesButton);
}



export function handlePageChange(event) {
    // Clicked page
    global.currentPage = Number(event.target.textContent);

    // Default index to read books from
    global.startIndex = 0;

    if (global.currentPage !== 1) global.startIndex = 40;
    if (global.currentPage !== 2 && global.currentPage !== 1) global.startIndex = global.startIndex * global.currentPage - 40;

    // Get new books from chosen page
    displayBooks();
}



function handleListOfPagesChange(direction, amountOfPages) {

    if (direction === "next" && pageStartIndex < amountOfPages - 10) pageStartIndex += 10;
    if (direction === "previous" && pageStartIndex > 10) pageStartIndex -= 10;

    if (googleBooksArray.length !== 0) return createPageNumbers(googleBooksArray.length);
    createPageNumbers(myLibrary.length);
}