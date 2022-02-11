import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, update, } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js"
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { myLibraryArray, global, userSettingsOnCloud } from "./main.js";
import { userSettings } from "./loadUserSettings.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZQlasiygfXSG7iKMwkpanVK8F_D4hDzQ",
    authDomain: "mylibrary3.firebaseapp.com",
    databaseURL: "https://mylibrary3-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "mylibrary3",
    storageBucket: "mylibrary3.appspot.com",
    messagingSenderId: "209783491184",
    appId: "1:209783491184:web:0e6c7592f905e82c9982b5",
    measurementId: "G-8JDWF4X4CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

const authenticationFormButton = document.querySelector("#authenticationFormButton")

export async function createUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("New user created");
        saveDataOnCloud(userCredential.user.uid);
    }
    catch (error) {
        console.log(error);
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in");
    }
    catch (error) {
        console.log(error)
    }
}

export function loginUserWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            if (userSettingsOnCloud === undefined) saveDataOnCloud();
            onLogin();
        })
        .catch((error) => {
            console.log(error)
        });
}

function logoutUser() {
    auth.signOut()
        .then(() => {
            console.log("Signed out")
            authenticationFormButton.textContent = "Login";
        })
}

export function onLogin() {

    // Change login button to a logout button when a user is signed in
    authenticationFormButton.addEventListener("click", logoutUser)
    authenticationFormButton.textContent = "Logout";

    // Remove login/register container
    const authenticationFormContainer = document.querySelector(".authenticationFormContainer");
    if (authenticationFormContainer !== null) authenticationFormContainer.remove();
}

export function onLogout() {
    authenticationFormButton.removeEventListener("click", logoutUser);
    authenticationFormButton.textContent = "Login";
}


export function saveDataOnCloud() {
    const db = getDatabase();
    set(ref(db, 'users/' + global.userID), {
        userSettings: userSettings,
        books: myLibraryArray
    });
}

export function updateBook(edits, bookIndex) {
    const db = getDatabase();

    update(ref(db, 'users/' + global.userID + '/books' + '/' + bookIndex), edits)
}

export function updateAllBooks() {
    const db = getDatabase();

    update(ref(db, 'users/' + global.userID), { books: myLibraryArray })
}

export function updateSettings(edits) {
    const db = getDatabase();

    update(ref(db, 'users/' + global.userID + "/userSettings"), edits)
}