import { myLibraryArray } from "./main.js";
import { Book } from "./constructors.js";
import { getGoogleBooks } from "./google.js";
import { saveData } from "./handleData.js";
import { showMyLibrary } from "./showMyLibrary.js";

// Dummy data
const LOTR = new Book("Lord Of The Rings", "J.R.R. Tolkien", "421", "https://pictures.abebooks.com/isbn/9780618129010-es.jpg", false)
const STARWARS = new Book("Star Wars", "George Lucas", "351", "https://d29xot63vimef3.cloudfront.net/image/star-wars-books/1-1.jpg", true);
const HJARNSTARK = new Book("Hjärnstark", "Anders Hansen", "268", "https://image.bokus.com/images/9789173630788_200x_hjarnstark-hur-motion-och-traning-starker-din-hjarna", true);

export async function createDummyData() {
    myLibraryArray.push(LOTR, STARWARS, HJARNSTARK);

    let googleBooksDummyData = [];

    await getGoogleBooks("Programming", "0", googleBooksDummyData)

    for (let i = 0; i < googleBooksDummyData.length; i++) {
        const title = googleBooksDummyData[i].hasOwnProperty("title") ? googleBooksDummyData[i].title : "Unknown";
        const authors = googleBooksDummyData[i].hasOwnProperty("authors") ? googleBooksDummyData[i].authors : "Unknown";
        const pageCount = googleBooksDummyData[i].hasOwnProperty("pageCount") ? googleBooksDummyData[i].pageCount : "Unknown";
        const backgroundImage = googleBooksDummyData[i].hasOwnProperty("imageLinks") ? googleBooksDummyData[i].imageLinks.thumbnail : "";
        myLibraryArray.push(new Book(title, authors, pageCount, backgroundImage));
    }

    saveData();
}



export function getDummyData() {
    // Creates dummy data if no books exist in local storage
    if (JSON.parse(window.localStorage.getItem("userLibrary")).length === 0) {
        async function waitForData() {
            await createDummyData();
            showMyLibrary();
        }

        waitForData();
    }
    else showMyLibrary();
}