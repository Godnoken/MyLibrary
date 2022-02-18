export function createObserver(target) {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
        delay: 350
    }

    let observer = new IntersectionObserver(callback, options);

    target.forEach(book => observer.observe(book));

}


let callback = (entries, observer) => {

    entries.forEach(book => {
        if (book.isIntersecting === false) book.target.classList.add("hide");
        else book.target.classList.remove("hide");
    })

}