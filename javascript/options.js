const body = document.querySelector("body");
const backgroundOptionsButton = document.querySelector("#backgroundOptionsButton");
const uiOptionsButton = document.querySelector("#uiOptionsButton");

backgroundOptionsButton.addEventListener("click", () => handleOptionsMenu(createBackgroundOptions, ".backgroundOptionsContainer"));
uiOptionsButton.addEventListener("click", () => handleOptionsMenu(createUIOptions, ".uiOptionsContainer"));

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
    changeType.textContent = "Fixed";

    links.href = "https://haikei.app/";
    links.target = "_blank";
    uploadBackground.type = "file";
    uploadBackground.accept = "image/*";

    uploadBackground.addEventListener("input", () => {
        mainBackground.style.backgroundImage = `url(https://127.0.0.1:8887/images/${uploadBackground.value.slice(12)})`;
    })

    linkBackground.addEventListener("input", () => {
        mainBackground.style.backgroundImage = `url(${linkBackground.value})`;
    })

    changeType.addEventListener("click", () => {
        if (changeType.textContent === "Fixed") {
            changeType.textContent = "Repeating";
            mainBackground.style.position = "absolute";
            mainBackground.style.backgroundSize = "100%";
        }
        else {
            changeType.textContent = "Fixed";
            mainBackground.style.position = "fixed";
            mainBackground.style.backgroundSize = "cover";
        }
    })

    container.appendChild(paragraph);
    container.appendChild(links);
    container.appendChild(uploadBackground);
    container.appendChild(linkBackground);
    container.appendChild(changeType);
}

function createFixedBackground() {
    const fixedBackground = document.createElement("div");

    fixedBackground.classList.add("fixedBackground");

    body.appendChild(fixedBackground);
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
    })

    mainTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--main-text-color`, mainTextColorInput.value)
    })
    
    secondaryTextColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--secondary-text-color`, secondaryTextColorInput.value)
    })
    
    exitButtonColorInput.addEventListener("input", () => {
        rootDocument.style.setProperty(`--exit-button-color`, exitButtonColorInput.value)
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

