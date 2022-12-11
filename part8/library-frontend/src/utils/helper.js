export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (allBooks) => {
    let uniqueSet = new Set();
    return allBooks.filter((book) => {
      return uniqueSet.has(book.title) ? false : uniqueSet.add(book.title);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    };
  });
};
