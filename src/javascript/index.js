/** Imports */
import("../css/style.css");
import("../css/normalize.css");
//import { getDummyData } from "./dummyData.js";
import(/* webpackPreload: true */ "./google.js");
import { auth, onLogin, onLogout, getUserDataFromCloud } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { loadSettings } from "./loadUserSettings.js";
import { getUserDataFromLocalStorage } from "./localStorage.js";


/** Global Variables */

export let global = {
    currentPage: 1,
    startIndex: 0,
    isLoggedIn: false,
    userID: "",
    userSettingsOnCloud: {}
}

export let myLibraryArray = [];


/** Run at start */

onAuthStateChanged(auth, (user) => {
    global.userSettingsOnCloud = undefined;

    if (user) {
        global.isLoggedIn = true;
        global.userID = user.uid;

        onLogin();
        getUserDataFromCloud();
    }
    else {
        global.isLoggedIn = false;

        onLogout();
        loadSettings();
        getUserDataFromLocalStorage();
        //getDummyData();
    }
})