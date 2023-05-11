import { gql, useQuery } from '@apollo/client';

const BOOKS = (genre) => {
  return gql`
    query {
      allBooks (genre: "${genre}") {
        title
        author {
          name
        }
        published
      }
    }
  `;
};

const Recommended = ({ show, genre }) => {
  const booksResult = useQuery(BOOKS(genre), { pollInterval: 10000 });

  if (!show) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{genre}</b>{' '}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
