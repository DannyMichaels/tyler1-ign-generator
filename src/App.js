import { useEffect, useState } from 'react';
import Api from './api';
import Button from '@material-ui/core/Button';
import './App.css';
import Home from './components/Home';
import MyList from './components/MyList';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { CircularProgress } from '@material-ui/core';

const BACKGROUND_IMG = 'https://i.redd.it/9rlwdb2br9jz.png';

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [list, setList] = useState(() => {
    let storedList = localStorage.getItem('tyler1-ign-list');
    if (storedList) {
      return JSON.parse(storedList);
    }
    return [];
  });

  useEffect(() => {
    const api = new Api();
    api
      .getAllWords()
      .then((result) => setWords(result))
      .catch((_err) => setError(true));
  }, []);

  useEffect(() => {
    localStorage.setItem('tyler1-ign-list', JSON.stringify(list));
  }, [list]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: showBackground ? `url(${BACKGROUND_IMG})` : '',
        minHeight: '100vh',
      }}>
      <NavBar />

      <Switch>
        <Route exact path="/">
          {words.length > 0 ? (
            <Home
              words={words}
              error={error}
              showBackground={showBackground}
              list={list}
              addToList={(addedIgn) => {
                if (list.find((ign) => ign === addedIgn)) return;
                setList((prevState) => [...prevState, addedIgn]);
              }}
            />
          ) : (
            <div
              className="centered"
              style={{ background: 'rgba(255,255,255, 0.5)' }}>
              <h1>Tyler1 IGN Generator</h1>
              <h2>loading...</h2>
              <CircularProgress style={{ width: '30px' }} />
            </div>
          )}
        </Route>
        <Route path="/my-list">
          <MyList
            listItems={list}
            showBackground={showBackground}
            removeFromList={(itemToRemoveIndex) =>
              setList((prevState) =>
                prevState.filter((_item, index) => index !== itemToRemoveIndex)
              )
            }
          />
        </Route>
      </Switch>

      <footer>
        <a
          target="_blank"
          rel="noreferrer"
          style={!showBackground ? { color: 'black' } : {}}
          href="https://github.com/DannyMichaels/tyler1-ign-generator">
          source code
        </a>

        <Button
          className="toggle-bg-btn"
          color={showBackground ? 'secondary' : 'primary'}
          variant="contained"
          onClick={() => setShowBackground((prev) => !prev)}>
          {showBackground ? 'Disable background' : 'Enable background'}
        </Button>
      </footer>
    </div>
  );
}

export default App;
