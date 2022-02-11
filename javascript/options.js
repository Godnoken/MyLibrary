import { userSettings } from "./loadUserSettings.js";
import { addBook } from "./addBook.js";
import { displayBooks } from "./displayBooks.js";
import { myLibraryArray, saveData } from "./main.js";
import { handlePageChange } from "./handlePages.js";
import { createUser, loginUser, loginUserWithGoogle } from "./firebase.js";

const body = document.querySelector("body");
const backgroundOptionsButton = document.querySelector("#backgroundOptionsButton");
const uiOptionsButton = document.querySelector("#uiOptionsButton");
const addBookFormButton = document.querySelector("#addBookButton");
const authenticationFormButton = document.querySelector("#authenticationFormButton");

backgroundOptionsButton.addEventListener("click", () => handleOptionsMenu(createBackgroundOptions, ".backgroundOptionsContainer"));
uiOptionsButton.addEventListener("click", () => handleOptionsMenu(createUIOptions, ".uiOptionsContainer"));
addBookFormButton.addEventListener("click", () => handleOptionsMenu(createBookForm, ".addBookFormContainer"));
authenticationFormButton.addEventListener("click", () => {
    if (authenticationFormButton.textContent === "Login") {
        handleOptionsMenu(createAuthenticationForm, ".loginFormContainer")
    }
});

// Makes sure only one options menu can be active at one time
export function handleOptionsMenu(createOptions, optionsContainerClass) {
    const selectedMenu = document.querySelector(optionsContainerClass);
    const otherMenu = document.querySelector(".activeOptionsMenu");

    if (selectedMenu !== null) {
        selectedMenu.remove();
        if (selectedMenu.classList.contains("editBookFormContainer")) createOptionsMenu(createOptions, optionsContainerClass);
    }
    else if (otherMenu !== null) otherMenu.remove(), createOptionsMenu(createOptions, optionsContainerClass);
    else createOptionsMenu(createOptions, optionsContainerClass);
}

function createOptionsMenu(createOptions, optionsContainerClass) {
    const container = document.createElement("div");
    const exitButton = document.createElement("div");
    const header = document.createElement("h3");

    container.classList.add("activeOptionsMenu");
    exitButton.classList.add("exitOptionsButton");
    header.classList.add("optionsHeaders");

    exitButton.textContent = "x";

    exitButton.addEventListener("click", () => container.remove());

    body.appendChild(container);
    container.appendChild(exitButton);
    container.appendChild(header);

    createOptions(container, header, optionsContainerClass);
}

function createBackgroundOptions(container, header) {
    const mainBackground = document.querySelector("#mainBackgroundImage");

    const paragraph = document.createElement("p");
    const links = document.createElement("a");
    const uploadBackgroundLabel = document.createElement("label");
    const uploadBackgroundInput = document.createElement("input");
    const linkBackgroundFieldset = document.createElement("fieldset");
    const linkBackgroundLegend = document.createElement("legend");
    const linkBackgroundInput = document.createElement("input");
    const changeType = document.createElement("button");

    container.classList.add("backgroundOptionsContainer");
    links.classList.add("optionsLinks");
    uploadBackgroundInput.classList.add("uploadBackgroundInput");
    uploadBackgroundLabel.classList.add("button");
    linkBackgroundInput.classList.add("inputTypeText");
    changeType.classList.add("button");

    header.textContent = "Background Options";
    paragraph.textContent = "Change background by either uploading the image or linking to the URL. SVG format and/or repeating patterns highly recommended.";
    links.innerHTML = "Try <span>Haikei!</span>";
    uploadBackgroundLabel.textContent = "Upload";
    linkBackgroundLegend.textContent = "URL";
    if (userSettings.backgroundPosition === "fixed") changeType.textContent = "Fixed";
    else changeType.textContent = "Repeating";

    linkBackgroundInput.setAttribute("placeholder", "https://backgroundImage.com");
    links.href = "https://haikei.app/";
    links.target = "_blank";
    uploadBackgroundInput.type = "file";
    uploadBackgroundInput.accept = "image/*";
    linkBackgroundInput.type = "url";

    uploadBackgroundInput.addEventListener("change", () => {
        const file = document.querySelector('.uploadBackgroundInput').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            mainBackground.style.backgroundImage = `url(${reader.result})`;
            userSettings.backgroundImage = `url(${reader.result})`;
            saveData("settings", { backgroundImage: `url(${reader.result})` });
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    })

    linkBackgroundInput.addEventListener("change", () => {
        mainBackground.style.backgroundImage = `url(${linkBackgroundInput.value})`;
        userSettings.backgroundImage = `url(${linkBackgroundInput.value})`;
        saveData("settings", { backgroundImage: `url(${linkBackgroundInput.value})` });
    })

    changeType.addEventListener("click", () => {
        if (changeType.textContent === "Fixed") {
            changeType.textContent = "Repeating";
            mainBackground.style.position = "absolute";
            mainBackground.style.backgroundSize = "100%";
            userSettings.backgroundPosition = "absolute";
            userSettings.backgroundSize = "100%";
            saveData("settings", { backgroundPosition: "absolute", backgroundSize: "100%" })
        }
        else {
            changeType.textContent = "Fixed";
            mainBackground.style.position = "fixed";
            mainBackground.style.backgroundSize = "cover";
            userSettings.backgroundPosition = "fixed";
            userSettings.backgroundSize = "cover";
            saveData("settings", { backgroundPosition: "fixed", backgroundSize: "cover" })
        }
    })

    container.appendChild(paragraph);
    container.appendChild(links);
    container.appendChild(uploadBackgroundLabel);
    container.appendChild(linkBackgroundFieldset);
    container.appendChild(changeType);
    uploadBackgroundLabel.appendChild(uploadBackgroundInput);
    linkBackgroundFieldset.appendChild(linkBackgroundLegend);
    linkBackgroundFieldset.appendChild(linkBackgroundInput);
}


function createUIOptions(container, header) {
    const root = getComputedStyle(document.documentElement);
    const rootDocument = document.querySelector(":root");

    const uiBackgroundColor = root.getPropertyValue("--ui-background-color");
    const mainTextColor = root.getPropertyValue("--main-text-color");
    const secondaryTextColor = root.getPropertyValue('--secondary-text-color');
    const exitButtonColor = root.getPropertyValue('--exit-button-color');

    const uiColorContainer = document.createElement("div");
    const uiBackgroundColorLabel = document.createElement("label");
    const uiBackgroundColorInput = document.createElement("input");
    const mainTextColorLabel = document.createElement("label");
    const mainTextColorInput = document.createElement("input");
    const secondaryTextColorLabel = document.createElement("label");
    const secondaryTextColorInput = document.createElement("input");
    const exitButtonColorLabel = document.createElement("label");
    const exitButtonColorInput = document.createElement("input");

    container.classList.add("uiOptionsContainer");
    uiColorContainer.classList.add("uiColorContainer");
    uiBackgroundColorLabel.classList.add("uiOptionsLabels");
    mainTextColorLabel.classList.add("uiOptionsLabels");
    secondaryTextColorLabel.classList.add("uiOptionsLabels");
    exitButtonColorLabel.classList.add("uiOptionsLabels");

    header.textContent = "UI Styling";

    uiBackgroundColorLabel.textContent = "UI Background";
    mainTextColorLabel.textContent = "Main text";
    secondaryTextColorLabel.textContent = "Secondary text";
    exitButtonColorLabel.textContent = "Exit button";

    uiBackgroundColorInput.type = "color";
    mainTextColorInput.type = "color";
    secondaryTextColorInput.type = "color";
    exitButtonColorInput.type = "color";

    uiBackgroundColorInput.value = uiBackgroundColor;
    mainTextColorInput.value = mainTextColor;
    secondaryTextColorInput.value = secondaryTextColor;
    exitButtonColorInput.value = exitButtonColor;

    uiBackgroundColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty("--ui-background-color", uiBackgroundColorInput.value);
        userSettings.uiBackground = uiBackgroundColorInput.value;
    })
    uiBackgroundColorInput.addEventListener("change", () => saveData("settings", { uiBackground: uiBackgroundColorInput.value}))

    mainTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--main-text-color`, mainTextColorInput.value)
        userSettings.mainText = mainTextColorInput.value;
    })
    mainTextColorInput.addEventListener("change", () => saveData("settings", { mainText: mainTextColorInput.value}))

    secondaryTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--secondary-text-color`, secondaryTextColorInput.value)
        userSettings.secondaryText = secondaryTextColorInput.value;
    })
    secondaryTextColorInput.addEventListener("change", () => saveData("settings", { secondaryText: secondaryTextColorInput.value}))

    exitButtonColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--exit-button-color`, exitButtonColorInput.value)
        userSettings.exitButton = exitButtonColorInput.value;
    })
    exitButtonColorInput.addEventListener("change", () => saveData("settings", { exitButton: exitButtonColorInput.value}))

    container.appendChild(uiColorContainer);
    uiColorContainer.appendChild(uiBackgroundColorLabel);
    uiBackgroundColorLabel.appendChild(uiBackgroundColorInput);
    uiColorContainer.appendChild(mainTextColorLabel);
    mainTextColorLabel.appendChild(mainTextColorInput);
    uiColorContainer.appendChild(secondaryTextColorLabel);
    secondaryTextColorLabel.appendChild(secondaryTextColorInput);
    uiColorContainer.appendChild(exitButtonColorLabel);
    exitButtonColorLabel.appendChild(exitButtonColorInput);
}


export function createBookForm(container, header, optionsContainerClass) {

    const fieldset = ["titleFieldset", "authorFieldset", "pagesFieldset", "coverFieldset"];
    const legend = ["titleLegend", "authorLegend", "pagesLegend", "coverLegend"];
    const input = ["titleInput", "authorInput", "pagesInput", "coverInput"];
    const legendText = ["Title", "Author", "Pages", "Book Cover"];
    const form = {};

    const formContainer = document.createElement("form");
    const checkboxLabel = document.createElement("label");
    const checkboxInput = document.createElement("input");
    const customCheckbox = document.createElement("span");
    const confirmButton = document.createElement("button");

    for (let i = 0; i < 4; i++) {
        form[fieldset[i]] = document.createElement("fieldset");
        form[legend[i]] = document.createElement("legend");
        form[input[i]] = document.createElement("input");

        form[input[i]].classList.add("inputTypeText");

        form[input[i]].type = "text";

        form[legend[i]].textContent = legendText[i];

        formContainer.appendChild(form[fieldset[i]]);
        form[fieldset[i]].appendChild(form[legend[i]]);
        form[fieldset[i]].appendChild(form[input[i]]);
    }
    form.pagesInput.type = "number";
    checkboxInput.type = "checkbox";

    formContainer.id = "form";
    form.titleInput.id = "addBookTitle";
    form.authorInput.id = "addBookAuthor";
    form.pagesInput.id = "addBookPages";
    form.coverInput.id = "addBookCover";
    checkboxLabel.id = "checkboxContainer";
    checkboxInput.id = "addBookRead";
    confirmButton.id = "bookFormSubmit";

    customCheckbox.classList.add("customCheckbox");
    checkboxInput.classList.add("checkbox");
    confirmButton.classList.add("button");

    confirmButton.textContent = "Confirm";



    container.appendChild(formContainer);
    formContainer.appendChild(checkboxLabel);
    formContainer.appendChild(confirmButton);
    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(customCheckbox);

    if (optionsContainerClass === ".addBookFormContainer") {
        container.classList.add("addBookFormContainer");
        header.textContent = "Add book";
        confirmButton.addEventListener("click", addBook);
    } else {
        container.classList.add("editBookFormContainer");
        header.textContent = "Edit book";

        let selectedBook = event.target.parentElement.parentElement.parentElement;
        const selectedBookIndex = selectedBook.dataset.bookindex;
        selectedBook = myLibraryArray[selectedBookIndex];

        form.titleInput.value = selectedBook.title;
        form.authorInput.value = selectedBook.authors;
        form.pagesInput.value = selectedBook.pageCount;
        form.coverInput.value = selectedBook.backgroundImage;
        checkboxInput.checked = selectedBook.read;

        confirmButton.addEventListener("click", (event) => {
            event.preventDefault();

            selectedBook.title = form.titleInput.value;
            selectedBook.authors = form.authorInput.value;
            selectedBook.pageCount = form.pagesInput.value;
            selectedBook.backgroundImage = form.coverInput.value;
            if (checkboxInput.checked === true) selectedBook.read = true;
            else selectedBook.read = false;

            container.remove();
            saveData(
                "book",
                {
                    title: selectedBook.title,
                    authors: selectedBook.authors,
                    pageCount: selectedBook.pageCount,
                    backgroundImage: selectedBook.backgroundImage,
                    read: selectedBook.read
                },
                selectedBookIndex
            )
            handlePageChange();
            displayBooks(undefined, myLibraryArray);
        });
    }
}


function createAuthenticationForm(container, header, optionsContainerClass) {
    const form = document.createElement("form");
    const emailFieldset = document.createElement("fieldset");
    const passwordFieldset = document.createElement("fieldset");
    const emailLegend = document.createElement("legend");
    const passwordLegend = document.createElement("legend");
    const emailInput = document.createElement("input");
    const passwordInput = document.createElement("input");
    const confirmButton = document.createElement("button");
    const loginRegisterText = document.createElement("a");
    const loginWithGoogleButton = document.createElement("div");

    container.classList.add("authenticationFormContainer");
    form.classList.add("authenticationForm");
    emailInput.classList.add("inputTypeText");
    passwordInput.classList.add("inputTypeText");
    confirmButton.classList.add("button");
    loginRegisterText.classList.add("loginRegisterText");
    loginWithGoogleButton.classList.add("loginWithGoogleButton");

    emailInput.id = "emailInput";
    passwordInput.id = "passwordInput";
    confirmButton.id = "loginRegisterButton";

    emailLegend.textContent = "Email";
    passwordLegend.textContent = "Password";
    loginWithGoogleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3A12 12 0 1 1 32 15l5.6-5.6A20 20 0 0 0 4 24a20 20 0 1 0 39.6-4z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8a12 12 0 0 1 19-4.5l5.7-5.6a20 20 0 0 0-31.3 5.3z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3a12 12 0 0 1-4 5.6l6.1 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-4z"/></svg> <p>Sign in with Google</p>';

    loginWithGoogleButton.addEventListener("click", loginUserWithGoogle)

    container.appendChild(form);
    form.appendChild(emailFieldset);
    form.appendChild(passwordFieldset);
    form.appendChild(confirmButton);
    form.appendChild(loginRegisterText);
    form.appendChild(loginWithGoogleButton);
    emailFieldset.appendChild(emailLegend);
    emailFieldset.appendChild(emailInput);
    passwordFieldset.appendChild(passwordLegend);
    passwordFieldset.appendChild(passwordInput);

    if (optionsContainerClass === ".loginFormContainer") {
        header.textContent = "Login";
        confirmButton.textContent = "Login";
        loginRegisterText.innerHTML = "Don't have an account? Register <span>here.</span>";

        loginRegisterText.addEventListener("click", () => {
            handleOptionsMenu(createAuthenticationForm, ".registerFormContainer");
        })

        confirmButton.addEventListener("click", (event) => {
            event.preventDefault();
            loginUser(emailInput.value, passwordInput.value);
        })
    }
    else {
        header.textContent = "Register";
        confirmButton.textContent = "Register";
        loginRegisterText.innerHTML = "Already have an account? Login <span>here.</span>";

        loginRegisterText.addEventListener("click", () => {
            handleOptionsMenu(createAuthenticationForm, ".loginFormContainer");
        })

        confirmButton.addEventListener("click", (event) => {
            event.preventDefault();
            createUser(emailInput.value, passwordInput.value);
        })
    }
}