import { isInViewport } from "./isInViewport.js";

let scheduledAnimationFrame;

let bookCards = window.document.querySelectorAll(".card");

window.document.addEventListener("scroll", () => restrictListener(handleVisibleCards))

window.addEventListener("resize", () => {

// setTimeout exists here due to some cards (sometimes) turning invisible rather than visible on resize of window
// Likely because the left hand side and bottom side are slightly outside the window at the beginning of a resize
setTimeout(() => {
    restrictListener(handleVisibleCards)
}, 50)

});


function restrictListener(functionToExecute) {

    // Prevent multiple rAF callbacks.
    if (scheduledAnimationFrame) {
        return;
    }

    scheduledAnimationFrame = true;

    // Decides how often to enable function execution
    setTimeout(functionToExecute, 350);
}



export function handleVisibleCards() {
    scheduledAnimationFrame = false;

    bookCards = window.document.querySelectorAll(".card")

    bookCards.forEach(book => {
       if (isInViewport(book) === false) book.classList.add("hide");
       else book.classList.remove("hide");
    })
}