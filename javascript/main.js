/** Imports */

import { handleGoogleSearch } from "./google.js";
import { addBook } from "./addBook.js";
import { showMyLibrary } from "./showMyLibrary.js";
import { googleBooksArray } from "./displayBooks.js";
import { createDummyData } from "./dummyData.js";
import { } from "./options.js";
import { auth, saveDataOnCloud, updateBook, updateAllBooks, updateSettings, onLogin, onLogout } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js"
import { saveDataOnLocalStorage } from "./saveDataOnLocalStorage.js";
import { loadSettings } from "./loadUserSettings.js";

/** Global Variables */

export let global = {
    currentPage: 1,
    startIndex: 0,
    isLoggedIn: false,
    userID: ""
}

export let myLibraryArray = [];
export let userSettingsOnCloud;


/** Elements */

const google = document.querySelector("#google");
const googleButton = document.querySelector("#googleButton");
const myLibraryButton = document.querySelector("#myLibrary");


/** Event Listeners */

googleButton.addEventListener("click", () => { if (google.value !== "") handleGoogleSearch(googleBooksArray) });
myLibraryButton.addEventListener("click", showMyLibrary);

/** Run at start */

onAuthStateChanged(auth, (user) => {
    userSettingsOnCloud = undefined;

    if (user) {
        global.isLoggedIn = true;
        global.userID = user.uid;

        onLogin();

        const dbRef = ref(getDatabase());

        get(child(dbRef, `users/${user.uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    myLibraryArray = snapshot.val().books;
                    userSettingsOnCloud = snapshot.val().userSettings;
                    showMyLibrary();
                    loadSettings();
                } else {
                    console.log("No data available");
                    saveData();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    else {
        global.isLoggedIn = false;

        onLogout();
        loadSettings();

        // Creates local storage library if user enters website for the first time
        if (JSON.parse(window.localStorage.getItem("userLibrary")) === null) window.localStorage.setItem("userLibrary", JSON.stringify([]));

        // Makes sure myLibraryArray stays updated with local storage on load
        if (JSON.parse(window.localStorage.getItem("userLibrary")).length !== 0) myLibraryArray = JSON.parse(window.localStorage.getItem("userLibrary"));

        // Creates dummy data if no books exist in local storage
        if (JSON.parse(window.localStorage.getItem("userLibrary")).length === 0) {
            async function waitForData() {
                await createDummyData();
                showMyLibrary();
            }

            waitForData();
        }
        else showMyLibrary();
    }
})


export function saveData(update, edits, bookIndex) {
        if (global.isLoggedIn === true) {
            if (update === "book") updateBook(edits, bookIndex);
            else if (update === "allBooks") updateAllBooks();
            else if (update === "settings") updateSettings(edits);
            else saveDataOnCloud(global.userID);
        }
        else {
            saveDataOnLocalStorage();
        }
}