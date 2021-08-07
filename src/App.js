import { useEffect, useState } from 'react';
import Api from './api';
import Button from '@material-ui/core/Button';
import './App.css';
import Home from './components/Home';
import MyList from './components/MyList';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';

const BACKGROUND_IMG = 'https://i.redd.it/9rlwdb2br9jz.png';

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    const api = new Api();

    api
      .getAllWords()
      .then((result) => setWords(result))
      .catch((_err) => setError(true));
  }, []);

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
          <Home words={words} error={error} showBackground={showBackground} />
        </Route>
        <Route path="/my-list">
          <MyList />
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
