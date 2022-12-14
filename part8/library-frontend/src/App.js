import { useState, useEffect } from 'react';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/login';

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries';
import RecommendedBooks from './components/recommendedBooks';
import { updateCache } from './utils/helper';

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const authorsResult = useQuery(ALL_AUTHORS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`Book ${addedBook.title}, has been added`);
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addedBook
      );
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('book-library-user-token');
    setToken(token);
  }, []);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();

    setPage('authors');
  };

  const handleLoggedinView = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recomended')}>recommended</button>
          <button onClick={logout}>logout</button>
        </>
      );
    } else {
      return <button onClick={() => setPage('login')}>login</button>;
    }
  };

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        {console.log('Error:', error)}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {handleLoggedinView()}
      </div>
      <Authors
        show={page === 'authors'}
        authors={authorsResult.data.allAuthors}
      />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setPage={setPage} setError={setError} />
      <Login
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />
      {token && <RecommendedBooks show={page === 'recomended'} />}
    </div>
  );
};

export default App;
