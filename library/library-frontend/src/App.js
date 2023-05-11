import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import { useApolloClient, useQuery, gql } from '@apollo/client';

const ME = gql`
  query Me {
    me {
      favoriteGenre
      id
      username
    }
  }
`;

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();
  const userResult = useQuery(ME);

  const handleLogout = async (event) => {
    event.preventDefault();
    setToken(null);
    console.log('logging out');
    localStorage.clear();
    client.resetStore();
  };

  if (token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommendations</button>
          <button onClick={handleLogout}>logout</button>
        </div>

        <Authors show={page === 'authors'} token={token} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} token={token} />

        <Recommended
          show={page === 'recommend'}
          genre={userResult.data.me.favoriteGenre}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        redirect={() => {
          setPage('authors');
        }}
      />
    </div>
  );
};

export default App;
