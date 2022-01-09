import { myLibraryArray } from "./main.js";
import { Book } from "./constructors.js";

// Dummy data
const LOTR = new Book("Lord Of The Rings", "J.R.R. Tolkien", "421", "https://images-na.ssl-images-amazon.com/images/I/81rzgaqcfZL.jpg", false)
const STARWARS = new Book("Star Wars", "George Lucas", "351", "https://d29xot63vimef3.cloudfront.net/image/star-wars-books/1-1.jpg", true);
const HJARNSTARK = new Book("Hjärnstark", "Anders Hansen", "268", "https://image.bokus.com/images/9789173630788_200x_hjarnstark-hur-motion-och-traning-starker-din-hjarna", true);

export function createDummyData() {
    myLibraryArray.push(LOTR, STARWARS, HJARNSTARK);

    for (let i = 0; i < 50; i++) {
        let bookCover = `https://picsum.photos/75/${Math.floor(Math.random() * 150) + 125}`;
        for (let j = 0; j < 1; j++) {
            myLibraryArray.push(new Book("", "", "", bookCover));
        }
    }
}