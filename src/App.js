import { useEffect, useState } from 'react';
import Api from './api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

const sample = (array) => array[Math.floor(Math.random() * array.length)];

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [numbers, setNumbers] = useState('');
  const [ign, setIgn] = useState('');

  const api = new Api();

  useEffect(() => {
    api
      .getAllWords()
      .then((result) => setWords(result))
      .catch((_err) => setError(true));

    // eslint-disable-next-line
  }, []);

  const handleCreateIgn = (e) => {
    e.preventDefault();
    const randomWordOne = sample(words);
    const randomWordTwo = sample(words);
    const resultWord = (randomWordOne + randomWordTwo).toUpperCase();

    setIgn(resultWord + numbers);

    setNumbers('');
  };

  return (
    <div className="App">
      <div className="centered">
        <h1>tyler1 ign generator</h1>
        {ign ? <h2>IGN: {ign}</h2> : null}

        {!error ? (
          <form onSubmit={handleCreateIgn}>
            <div>
              <TextField
                variant="filled"
                style={{ background: '#fff' }}
                placeholder="enter a number"
                type="number"
                required
                value={numbers}
                onChange={(e) => setNumbers(String(e.target.value))}
              />
            </div>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Generate IGN
            </Button>
          </form>
        ) : (
          <h1>sorry! something went wrong.</h1>
        )}
      </div>
    </div>
  );
}

export default App;
