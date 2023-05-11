import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const Birthyear = ({ authors, token }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR);

  const submit = async (event) => {
    event.preventDefault();

    const b = parseInt(born);
    updateBirthyear({ variables: { name, born: b } });

    setName('');
    setBorn('');
  };

  if (!token) {
    return;
  }

  return (
    <div>
      <h2>Update author birth year</h2>
      <form onSubmit={submit}>
        <label>
          Pick author
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Birthyear;
