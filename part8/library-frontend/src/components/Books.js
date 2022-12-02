import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, { variables: { genre } });
  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          in <strong>{genre}</strong> genre
        </p>
      ) : (
        'all genres'
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
