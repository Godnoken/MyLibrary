import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { createPageNumbers } from "./handlePages.js";
import { handleSort } from "./handleSort.js";

const google = document.querySelector("#google");
const googleButton = document.querySelector("#googleButton");
let axios;
googleButton.addEventListener("click", () => {
    (async function() {
        if (axios === undefined) axios = (await import("axios")).default;
        if (google.value !== "") handleGoogleSearch(googleBooksArray)
    })();
})

let previousGoogleSearch;
let googleSearch;

export function handleGoogleSearch(googleBooksArray) {
    
    if (googleBooksArray.length === 0) googleSearch = "";
    let startIndex = 0;
    previousGoogleSearch = googleSearch;

    if (previousGoogleSearch !== google.value) {
        googleBooksArray = [];
        googleSearch = google.value;
        
        (async () => {
            const axiosRequests = [];
            
            for (let i = 0; i < 10; i++) {
                axiosRequests.push(getGoogleBooks(googleSearch, startIndex, googleBooksArray))
                startIndex += 40;
            }
            
            // Waits for all axios requests to finish
            await Promise.all(axiosRequests)

            if (googleBooksArray.length !== 0) {
                createPageNumbers(googleBooksArray.length);
                displayBooks(googleBooksArray);
                handleSort(googleBooksArray);
            }
            // Should be changed later for better UX.
            else alert("No books found. Refine your search.");
        })()
    }
    // Should be changed later for better UX.
    else alert("Input a new search term.");
}


export async function getGoogleBooks(googleSearch, startIndex, googleBooksArray) {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${googleSearch}&maxResults=40&startIndex=${startIndex}&fields=items/volumeInfo(title,authors,pageCount,imageLinks)&key=AIzaSyBZQlasiygfXSG7iKMwkpanVK8F_D4hDzQ`)
        .then(response => {
            if (response.data.items !== "undefined") {
                for (let i = 0; i < response.data.items.length; i++) {
                    googleBooksArray.push(response.data.items[i].volumeInfo)
                }
            }
        })
        .catch(error => {
            return console.log("Probably reached the API call limit..", error);
        })
}