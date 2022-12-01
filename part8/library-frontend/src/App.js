import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/login';

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const result1 = useQuery(ALL_AUTHORS);
  const result2 = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const handleLoggedinView = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </>
      );
    } else {
      return <button onClick={() => setPage('login')}>login</button>;
    }
  };

  if (result1.loading || result2.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {handleLoggedinView()}
      </div>

      <Authors show={page === 'authors'} authors={result1.data.allAuthors} />
      <Books show={page === 'books'} books={result2.data.allBooks} />
      <NewBook show={page === 'add'} setPage={setPage} setError={setError} />
      <Login
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
