export function removeAllBooksFromDisplay(displayedBooks) {
    // Convert from childNodes to array because of a bug(?)
    let displayedBooksArray = Array.from(displayedBooks);

    // Remove all currently displayed books
    displayedBooksArray.forEach(book => book.remove());
}

export function removeAllPageNumbersFromDisplay(pageNumbers) {
    pageNumbers = Array.from(pageNumbers);
    pageNumbers.forEach(page => page.remove());
}

