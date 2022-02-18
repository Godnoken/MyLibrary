

// Refreshes each book's index so it corresponds to the correct element in the array
// Starts from previously removed book's index so it doesn't have to loop through the entire array
export function handleRefreshOfBookIndex(removedBookIndex, currentBookToUpdate, lastDisplayedBook) {

    const bookCards = window.document.querySelectorAll(".card");
    
    for (let i = removedBookIndex; i < lastDisplayedBook; i++) {
        bookCards[currentBookToUpdate].setAttribute("data-bookindex", i);
        currentBookToUpdate++;
    }
}