# MyLibrary



## Performance Issues

When having over 500 books, performance goes bonkers.

**What do I need to optimize (or remove..)?**

1. Book index refresh. Currently the indexes refreshes at each book deletion. It's nice to keep the array clean but I need to figure out how to do this another way, OR refresh only on webpage load

2. Smooth animations on deletion. One easy solution now is to just inactivate the function when user reaches a certain amount of books. However I will try to somehow only animate the books in the viewport, OR just animate the next 50/100 books or so.

3. To be continued...