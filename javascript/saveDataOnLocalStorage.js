import { myLibraryArray } from "./main.js";
import { userSettings } from "./loadUserSettings.js";

// Saves entire library to local storage aka browser
export function saveDataOnLocalStorage() {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
    localStorage.setItem("userLibrary", JSON.stringify(myLibraryArray));
}
