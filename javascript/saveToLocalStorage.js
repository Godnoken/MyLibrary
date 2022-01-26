import { myLibraryArray } from "./main.js";
import { userSettings } from "./loadUserSettings.js";

// Saves entire library to local storage aka browser
export function saveLibraryToLocalStorage() {
    localStorage.setItem("userLibrary", JSON.stringify(myLibraryArray));
}

export function saveSettingstoLocalStorage() {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
}