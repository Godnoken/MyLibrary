const bookForm = document.querySelector("#bookForm");
const addBookButton = document.querySelector("#addBookButton");
const exitAddBookFormButton = document.querySelector("#exitAddBook");

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