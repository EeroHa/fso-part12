import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const ALL_BOOKS = (genre) => {
  if (genre !== 'all') {
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
  }
  return gql`
    query {
      allBooks {
        title
        author {
          name
        }
        published
        genres
      }
    }
  `;
};

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all');
  const booksResult = useQuery(ALL_BOOKS(genreFilter), { pollInterval: 10000 });
  const allBooks = useQuery(ALL_BOOKS('all'), { pollInterval: 10000 });

  if (!props.show) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data.allBooks;
  const allBooksData = allBooks.data.allBooks;
  const allGenres = allBooksData.flatMap((book) => book.genres);
  const genres = [...new Set(allGenres), 'all'];

  return (
    <div>
      <h2>books</h2>
      <p>
        Filter by genre:{' '}
        <select
          value={genreFilter}
          onChange={({ target }) => {
            setGenreFilter(target.value);
            booksResult.refetch();
          }}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
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

export default Books;
