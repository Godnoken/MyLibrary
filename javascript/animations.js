const bookForm = document.querySelector("#addBookForm");
const addBookButton = document.querySelector("#addBookButton");
const exitAddBookFormButton = document.querySelector("#addBookExit");

addBookButton.addEventListener("click", handleAddBookAnimation);
exitAddBookFormButton.addEventListener("click", handleAddBookAnimation);

// Handles animation of the form that lets user add a book
export function handleAddBookAnimation() {
    if (bookForm.className === "activeAddBook") {
        bookForm.classList.remove("activeAddBook");
        bookForm.classList.add("inactiveAddBook");
    } else if (bookForm.className === "inactiveAddBook") {
        bookForm.classList.remove("inactiveAddBook");
        bookForm.classList.add("activeAddBook");
    } else {
        bookForm.classList.add("activeAddBook");
    }
}

// Creates & displays all the hidden text (if any) of title and authors
export function handleHiddenCardText(event) {
    let cardParagraph = event.target;
    let card = cardParagraph.parentElement.parentElement.parentElement;

    if (document.querySelector(".showAllParagraphText") !== null) document.querySelector(".showAllParagraphText").remove()
    
    if (cardParagraph.className === "cardParagraphs" && cardParagraph.textContent.length > 35) {
        cardParagraph.style.cursor = "pointer";
        cardParagraph.style.userSelect = "none";

        let showAllParagraphText = document.createElement("div");
        card.appendChild(showAllParagraphText);
        showAllParagraphText.classList.add("showAllParagraphText");
        showAllParagraphText.textContent = cardParagraph.textContent;
        showAllParagraphText.style.left = ((cardParagraph.offsetWidth - showAllParagraphText.offsetWidth) / 2) + "px";
        showAllParagraphText.style.top = cardParagraph.offsetTop / 2 + "px";

        card.addEventListener("mouseleave", deleteCardTextboxes)
    }
}

// Creates & displays "Copied!" textbox on click
export function handleCopiedTextbox(event) {
    let cardParagraph = event.target;
    if (cardParagraph.textContent.length > 35) {
    
        if (document.querySelector(".copied") !== null) document.querySelector(".copied").remove();
        
        navigator.clipboard.writeText(cardParagraph.textContent)
        
        const copied = document.createElement("p");
        document.querySelector("#booksDisplay").appendChild(copied);
        copied.style.left = (event.pageX + 10) + "px";
        copied.style.top = event.pageY + "px";
        copied.textContent = "Copied!";
        copied.classList.add("copied");
        
        setTimeout(() => {
            copied.remove();
        }, 650)
    }
}

function deleteCardTextboxes() {
    if (document.querySelector(".showAllParagraphText") !== null) document.querySelector(".showAllParagraphText").remove()
    if (document.querySelector(".copied") !== null) document.querySelector(".copied").remove();
}