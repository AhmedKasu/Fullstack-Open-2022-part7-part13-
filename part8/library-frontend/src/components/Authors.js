import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import { EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [resetValue, setResetValue] = useState();

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const authors = props.authors;
  if (!props.show) {
    return null;
  }

  const handleUpdate = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setResetValue(null);
    setBorn('');
    setName('');
  };

  const authorOptions = authors.reduce((options, { name }) => {
    return options.concat({ value: name, label: name });
  }, []);

  const handleChange = (options) => {
    setName(options.value);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <Select
        placeholder='Select Author'
        value={resetValue}
        onChange={handleChange}
        options={authorOptions}
      />
      <form onSubmit={handleUpdate}>
        <div>
          born
          <input
            onChange={({ target }) => setBorn(target.value)}
            value={born}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default Authors;
