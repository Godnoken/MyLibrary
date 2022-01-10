const menu = document.querySelector("#menu");
const menuButton = document.querySelector("#menuButton");
const bookForm = document.querySelector("#bookForm");
const addBookButton = document.querySelector("#addBookButton");
const exitAddBookFormButton = document.querySelector("#exitAddBook");

menuButton.addEventListener("click", handleMenuAnimation)
addBookButton.addEventListener("click", handleAddBookAnimation);
exitAddBookFormButton.addEventListener("click", handleAddBookAnimation);


// Handles animation of the menu button
export function handleMenuAnimation() {
    if (menu.className === "activeMenu") {
        menu.classList.remove("activeMenu");
        menu.classList.add("inactiveMenu");
    } else if (menu.className === "inactiveMenu") {
        menu.classList.remove("inactiveMenu");
        menu.classList.add("activeMenu");
    } else {
        menu.classList.add("activeMenu");
    }
}

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
