import { isInViewport } from "./isInViewport.js";

let scheduledAnimationFrame;

let bookCards = window.document.querySelectorAll(".card");

window.document.addEventListener("scroll", () => onScroll())
window.document.addEventListener("resize", handleVisibleCards());

function onScroll() {

    // Prevent multiple rAF callbacks.
    if (scheduledAnimationFrame) {
        return;
    }

    scheduledAnimationFrame = true;

    // Decides how often to listen to the scroll animations
    setTimeout(handleVisibleCards, 250);
}



function handleVisibleCards() {
    scheduledAnimationFrame = false;

    bookCards = window.document.querySelectorAll(".card")

    bookCards.forEach(book => {
        if (isInViewport(book) === false) book.style.visibility = "hidden";
        else book.style.visibility = "visible";
    })
}