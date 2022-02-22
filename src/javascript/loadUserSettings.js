import { global } from "./index.js";

export const defaultUserSettings = {
    exitButton: "#ff6161",
    mainText: "#ffffff",
    secondaryText: "#101b47",
    uiBackground: "#6d66cf",
    backgroundImage: "url(../src/images/layered-waves-haikei.svg)",
    backgroundPosition: "fixed",
    backgroundSize: "cover",
};

export let userSettings = {
    
};

export function loadSettings() {

    if (global.isLoggedIn === false) {
        if (JSON.parse(window.localStorage.getItem("userSettings")) !== null) {
            userSettings = JSON.parse(window.localStorage.getItem("userSettings"));
        }
        else {
            userSettings = defaultUserSettings;
        }
    }
    else if (global.isLoggedIn === true && global.userSettingsOnCloud !== undefined) {
        userSettings = global.userSettingsOnCloud;
    }


    const rootDocument = document.querySelector(":root");
    const mainBackground = document.querySelector("#mainBackgroundImage");
    rootDocument.style.setProperty("--ui-background-color", userSettings.uiBackground);
    rootDocument.style.setProperty(`--main-text-color`, userSettings.mainText);
    rootDocument.style.setProperty(`--secondary-text-color`, userSettings.secondaryText);
    rootDocument.style.setProperty(`--exit-button-color`, userSettings.exitButton);

    mainBackground.style.backgroundImage = userSettings.backgroundImage;
    mainBackground.style.backgroundSize = userSettings.backgroundSize;
    mainBackground.style.position = userSettings.backgroundPosition;
}