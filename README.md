# MyLibrary

Live: https://godnoken.github.io/mylibrary/dist/index.html





## Features To Be Added

**Added more sorting functions and a menu. Will likely not add filtering as it would require me to rewrite the whole indexing system.**
1. More filtering functions.

**Added. User can now delete all books or revert settings back to default with a few clicks. Works on cloud and local storage.**
2. Delete all data (usersettings, books etcetera)

## Features That Might Be Considered

**Added cloud storage support with firebase**
1. Adding cloud support

## Things That Need To Be Looked Over

1. Mobile styling adjustments

2. Documenting code

3. Structuring code

4. Refactoring code

## Known bugs

**Fixed. Bug appeared due to bookIndexes not being updated**
1. When a new book is added through the add book form, its card gets created on several pages, somehow, until page is refreshed

2. The list of pages is currently not functional as planned when pages exceed 10

**Most likely fixed. Haven't been able to reproduce it again after introducing async/wait to API calls**
3. Sometimes when a google search is made, the amount of pages cretated exceed the amount of pages needed for the collection of books retrieved. Result is an empty page or two at the end.

**Fixed. API calls now utilize async/await**
4. When entering website for the first time (retrieving dummy data from google) or making google searches on mobile (sometimes slower computers/internet too), the search is completed but no books displayed until user changes page. This is because I have used setTimeout instead of async await.

**Partly fixed. This was due to utilizing createCard instead of displayBooks. Using displayBooks fixes the bug, but it is ineffecient. Will look for a better way to fix this in the future.**
5. If you delete a book from page 1 and a book from page 2 "transfers" over to page 1 and then switch page to page 2, there's all of a sudden two copies of the "transferred" book on page 2. I think it has something to do with the indexes.



## Performance Issues

1. Local storage. Currently the entire array is updated on book deletion, user checking read button etc.. I'll have to rewrite this and make sure only the affected book gets updated/deleted in the local storage.

**Text below is no longer of concern, website now has pages and a limit of 40 books per page**

When having over 500 books, performance goes bonkers.

**What do I need to optimize (or remove..)?**

**Partly done** refresh function is now much faster due to not having to call a nodeList with every loop iteration. May work on this further.

1. Book index refresh. Currently the indexes refreshes at each book deletion. It's nice to keep the array clean but I need to figure out how to do this another way, OR refresh only on webpage load

**Done** All elements not in viewport + extra height turn invisible

2. Smooth animations on deletion. One easy solution now is to just inactivate the function when user reaches a certain amount of books. However I will try to somehow only animate the books in the viewport, OR just animate the next 50/100 books or so.
