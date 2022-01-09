// Reads if book can be currently seen by user
export function isInViewport(book) {
    const rect = book.getBoundingClientRect();
    return (
        rect.top >= 0 - 350 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + 350 || document.documentElement.clientHeight + 350) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}