import { displayBooks } from "./displayBooks.js";
import { createPageNumbers } from "./handlePages.js";

let previousGoogleSearch;
let googleSearch;

export function handleGoogleSearch(startIndex, googleBooksArray) {

    if (googleBooksArray.length === 0) googleSearch = "";
    startIndex = 0;
    previousGoogleSearch = googleSearch;

    if (previousGoogleSearch !== google.value) {
        googleBooksArray = [];
        googleSearch = google.value;

        for (let i = 0; i < 10; i++) {
            getGoogleBooks(googleSearch, startIndex, googleBooksArray);
            startIndex += 40;
        }
        setTimeout(() => {
            startIndex = 0;
            displayBooks(googleBooksArray);
            console.log(googleBooksArray)
        }, 1200)

        setTimeout(() => {
            createPageNumbers(googleBooksArray.length);
        }, 1500)
    }
    else {
        displayBooks();
        createPageNumbers(googleBooksArray.length)
    }
}

export function getGoogleBooks(googleSearch, startIndex, googleBooksArray) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleSearch}&maxResults=40&startIndex=${startIndex}&fields=items/volumeInfo(title,authors,pageCount,imageLinks)&key=AIzaSyBZQlasiygfXSG7iKMwkpanVK8F_D4hDzQ`)
        .then(response => {
            if (response.data.items !== "undefined") {
                for (let i = 0; i < response.data.items.length; i++) {
                    googleBooksArray.push(response.data.items[i].volumeInfo)
                }
                console.log(response)
            }
        })
        .catch(error => {
            return;
            console.log(`You ran into.. ${error}`)
            alert(`You ran into.. ${error}`)
        })
}