import { saveSettingstoLocalStorage } from "./saveToLocalStorage.js";
import { userSettings } from "./loadUserSettings.js";
import { addBook } from "./addBook.js";

const body = document.querySelector("body");
const backgroundOptionsButton = document.querySelector("#backgroundOptionsButton");
const uiOptionsButton = document.querySelector("#uiOptionsButton");
const addBookFormButton = document.querySelector("#addBookButton");

backgroundOptionsButton.addEventListener("click", () => handleOptionsMenu(createBackgroundOptions, ".backgroundOptionsContainer"));
uiOptionsButton.addEventListener("click", () => handleOptionsMenu(createUIOptions, ".uiOptionsContainer"));
addBookFormButton.addEventListener("click", () => handleOptionsMenu(createAddBookForm, ".addBookFormContainer"));


// Makes sure only one options menu can be active at one time
function handleOptionsMenu(createOptions, optionsContainerClass) {
    const selectedMenu = document.querySelector(optionsContainerClass);
    const otherMenu = document.querySelector(".activeOptionsMenu");
    
    if (selectedMenu !== null) selectedMenu.remove();
    else if (otherMenu !== null) otherMenu.remove(), createOptionsMenu(createOptions);
    else createOptionsMenu(createOptions);
}

function createOptionsMenu(createOptions) {
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
    
    createOptions(container, header);
}

function createBackgroundOptions(container, header) {
    const mainBackground = document.querySelector("#mainBackgroundImage");

    const paragraph = document.createElement("p");
    const links = document.createElement("a");
    const uploadBackground = document.createElement("input");
    const linkBackground = document.createElement("input");
    const changeType = document.createElement("button");

    container.classList.add("backgroundOptionsContainer");
    links.classList.add("optionsLinks");
    changeType.classList.add("button");

    header.textContent = "Background Options";
    paragraph.textContent = "Change background by either uploading the image or linking to the URL. SVG format and repeating patterns highly recommended if you want to have a scrollable background.";
    links.innerHTML = "Try <span>Haikei!</span>";
    if (userSettings.backgroundPosition === "fixed") changeType.textContent = "Fixed";
    else changeType.textContent = "Repeating";
    linkBackground.setAttribute("placeholder", "URL..")

    links.href = "https://haikei.app/";
    links.target = "_blank";
    uploadBackground.type = "file";
    uploadBackground.accept = "image/*";

    uploadBackground.addEventListener("input", () => {
        mainBackground.style.backgroundImage = `url(https://127.0.0.1:8887/images/${uploadBackground.value.slice(12)})`;
        userSettings.backgroundImage = `url(https://127.0.0.1:8887/images/${uploadBackground.value.slice(12)})`;
        saveSettingstoLocalStorage();
    })

    linkBackground.addEventListener("input", () => {
        mainBackground.style.backgroundImage = `url(${linkBackground.value})`;
        userSettings.backgroundImage = `url(${linkBackground.value})`;
        saveSettingstoLocalStorage();
    })

    changeType.addEventListener("click", () => {
        if (changeType.textContent === "Fixed") {
            changeType.textContent = "Repeating";
            mainBackground.style.position = "absolute";
            mainBackground.style.backgroundSize = "100%";
            userSettings.backgroundPosition = "absolute";
            userSettings.backgroundSize = "100%";
            saveSettingstoLocalStorage();
        }
        else {
            changeType.textContent = "Fixed";
            mainBackground.style.position = "fixed";
            mainBackground.style.backgroundSize = "cover";
            userSettings.backgroundPosition = "fixed";
            userSettings.backgroundSize = "cover";
            saveSettingstoLocalStorage();
        }
    })

    container.appendChild(paragraph);
    container.appendChild(links);
    container.appendChild(uploadBackground);
    container.appendChild(linkBackground);
    container.appendChild(changeType);
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
        saveSettingstoLocalStorage();
    })

    mainTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--main-text-color`, mainTextColorInput.value)
        userSettings.mainText = mainTextColorInput.value;
        saveSettingstoLocalStorage();
    })
    
    secondaryTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--secondary-text-color`, secondaryTextColorInput.value)
        userSettings.secondaryText = secondaryTextColorInput.value;
        saveSettingstoLocalStorage();
    })
    
    exitButtonColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--exit-button-color`, exitButtonColorInput.value)
        userSettings.exitButton = exitButtonColorInput.value;
        saveSettingstoLocalStorage();
    })

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

function createAddBookForm(container, header) {
    container.classList.add("addBookFormContainer");
    header.textContent = "Add book";

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
        
        form[input[i]].classList.add("addBookInput");

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

    confirmButton.addEventListener("click", addBook);
    
    container.appendChild(formContainer);
    formContainer.appendChild(checkboxLabel);
    formContainer.appendChild(confirmButton);
    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(customCheckbox);
}