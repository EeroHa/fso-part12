import { gql, useQuery } from '@apollo/client';
import Birthyear from './Birthyear';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = (props) => {
  const authorsResult = useQuery(ALL_AUTHORS, { pollInterval: 10000 });

  if (!props.show) {
    return null;
  }

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }

  const authors = authorsResult.data.allAuthors;

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
      <Birthyear authors={authors} token={props.token} />
    </div>
  );
};

export default Authors;
