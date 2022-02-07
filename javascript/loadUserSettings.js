export let userSettings = {
    exitButton: "#ff6161",
    mainText: "#ffffff",
    secondaryText: "#101b47",
    uiBackground: "#6d66cf",
    backgroundImage: "url(images/layered-waves-haikei.svg)",
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