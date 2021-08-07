import { useEffect, useState } from 'react';
import Api from './api';
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
      <h1>tyler1 ign generator</h1>
      {ign ? <h2>IGN: {ign}</h2> : null}

      {!error ? (
        <form onSubmit={handleCreateIgn}>
          <div>
            <input
              placeholder="enter a number"
              type="number"
              required
              value={numbers}
              onChange={(e) => setNumbers(String(e.target.value))}
            />
          </div>
          <br />
          <button>Generate IGN</button>
        </form>
      ) : (
        <h1>sorry! something went wrong.</h1>
      )}
    </div>
  );
}

export default App;
