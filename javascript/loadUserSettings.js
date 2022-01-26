export let userSettings = {
    uiBackground: "#000000",
    mainText: "#FFFFFF",
    secondaryText: "#5d93ff",
    exitButton: "#ff5757",
    backgroundImage: "url(https://127.0.0.1:8887/images/stacked-peaks-haikei.svg)",
    backgroundPosition: "fixed",
    backgroundSize: "cover",
};

function loadSettings() {

    if (JSON.parse(window.localStorage.getItem("userSettings")) !== null) userSettings = JSON.parse(window.localStorage.getItem("userSettings"));

    const rootDocument = document.querySelector(":root");
    rootDocument.style.setProperty("--ui-background-color", userSettings.uiBackground);
    rootDocument.style.setProperty(`--main-text-color`, userSettings.mainText);
    rootDocument.style.setProperty(`--secondary-text-color`, userSettings.secondaryText);
    rootDocument.style.setProperty(`--exit-button-color`, userSettings.exitButton);
    
    window.addEventListener("DOMContentLoaded", () => {
        const mainBackground = document.querySelector("#mainBackgroundImage");
        
        mainBackground.style.backgroundImage = userSettings.backgroundImage;
        mainBackground.style.backgroundSize = userSettings.backgroundSize;
        mainBackground.style.position = userSettings.backgroundPosition;
    })
}

loadSettings();