import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { handlePageChange } from "./handlePages.js";

const sortButton = document.querySelector("#sort");
sortButton.addEventListener("click", sortArray);

let array;

export function handleSort(passedArray) {
    array = passedArray;
}

function sortArray() {

    array.sort((a, b) => {
        let aa = a.title.toLowerCase();
        let bb = b.title.toLowerCase();

        if (aa < bb) return -1;
        if (bb > aa) return 1;
        return 0;
    });

    handlePageChange();

    if (googleBooksArray.length !== 0) displayBooks(array, undefined)
    else displayBooks(undefined, array);
}