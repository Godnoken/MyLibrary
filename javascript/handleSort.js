import { saveData } from "./main.js"
import { displayBooks, googleBooksArray } from "./displayBooks.js";
import { handlePageChange } from "./handlePages.js";

let array;

export function handleSort(passedArray) {
    array = passedArray;
}

export function sortArray(direction, sortThis) {

    array.sort((a, b) => {
        let aa;
        let bb;

        console.log(a, b)

        if (sortThis === "title") {
            aa = a.title.toLowerCase();
            bb = b.title.toLowerCase();
        }
        else if (sortThis === "authors") {
            aa = a.authors[0].toLowerCase();
            bb = b.authors[0].toLowerCase();
        }
        else if (sortThis === "pages") {
            aa = a.pageCount;
            bb = b.pageCount;
        }

        if (direction === "ascending") {
            if (aa < bb) return -1;
            if (bb > aa) return 1;
        }
        else if (direction === "descending") {
            if (aa > bb) return -1;
            if (bb < aa) return 1;
        }

        return 0;
    });

    handlePageChange();
    saveData("allBooks");

    if (googleBooksArray.length !== 0) displayBooks(array, undefined)
    else displayBooks(undefined, array);
}