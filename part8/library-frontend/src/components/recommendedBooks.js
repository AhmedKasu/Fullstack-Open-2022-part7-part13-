import { useQuery } from '@apollo/client';
import { ALL_BOOKS, LOGGED_USER } from '../queries';

const RecommendedBooks = (props) => {
  const userResult = useQuery(LOGGED_USER);
  const favouriteGenre = userResult.data
    ? userResult.data.me.favouriteGenre
    : null;

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: 'patterns' },
  });

  if (booksResult.loading) {
    return <div>loading...</div>;
  }
  const favouriteBooks = booksResult.data.allBooks;

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedBooks;
