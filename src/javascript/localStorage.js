import { myLibraryArray } from "./index.js";
import { userSettings } from "./loadUserSettings.js";




// Saves entire library to local storage aka browser
export function saveDataOnLocalStorage() {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
    localStorage.setItem("userLibrary", JSON.stringify(myLibraryArray));
}



export function getUserDataFromLocalStorage() {
    // Creates local storage library if user enters website for the first time
    if (JSON.parse(window.localStorage.getItem("userLibrary")) === null) {
        window.localStorage.setItem("userLibrary", JSON.stringify([]));
    }

    // Makes sure myLibraryArray stays updated with local storage on load
    if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) {
        myLibraryArray.push(...JSON.parse(window.localStorage.getItem("userLibrary")));
    }
}