import { saveDataOnCloud, updateBook, updateAllBooks, updateSettings, clearAllBooks, clearSettings } from "./firebase.js";
import { saveDataOnLocalStorage } from "./localStorage.js";
import { loadSettings, defaultUserSettings } from "./loadUserSettings.js";
import { global, myLibraryArray } from "./main.js";
import { showMyLibrary } from "./showMyLibrary.js";



export function saveData(update, edits, bookIndex) {
    if (global.isLoggedIn === true) {
        if (update === "book") updateBook(edits, bookIndex);
        else if (update === "allBooks") updateAllBooks();
        else if (update === "settings") updateSettings(edits);
        else saveDataOnCloud(global.userID);
    }
    else saveDataOnLocalStorage();
}



export function clearData(clear) {
    if (global.isLoggedIn === true) {
        if (clear === "books") clearAllBooks();
        else if (clear === "settings") clearSettings();
    }
    else if (global.isLoggedIn === false) {
        if (clear === "books") {
            window.localStorage.setItem("userLibrary", JSON.stringify([]));
            while (myLibraryArray.length !== 0) {
                myLibraryArray.pop();
            }
            showMyLibrary();
        }
        else if (clear === "settings") window.localStorage.setItem("userSettings", JSON.stringify(defaultUserSettings)), loadSettings();
    }
}