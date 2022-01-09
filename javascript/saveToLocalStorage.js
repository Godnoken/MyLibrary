import { myLibraryArray } from "./main.js";

// Saves entire library to local storage aka browser
export function saveToLocalStorage() {
    localStorage.setItem("userLibrary", JSON.stringify(myLibraryArray));
}