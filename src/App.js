import { useEffect, useState } from 'react';
import Api from './api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

const sample = (array) => array[Math.floor(Math.random() * array.length)];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [manuallyEnteredNumbers, setManuallyEnteredNumbers] = useState('');
  const [enterNumsForMe, setEnterNumsForMe] = useState(true);
  const [ign, setIgn] = useState('');
  const [visitedRandomWords, setVisitedRandomWords] = useState(new Set()); // get unique generated IGNS to avoid boredom

  useEffect(() => {
    const api = new Api();

    api
      .getAllWords()
      .then((result) => setWords(result))
      .catch((_err) => setError(true));
  }, []);

  const handleCreateIgn = (e) => {
    e.preventDefault();

    setVisitedRandomWords(
      (prevState) => new Set([...prevState, randomWordOne, randomWordTwo])
    );

    let randomWordOne = sample(words),
      randomWordTwo = sample(words);

    // let people always get names that they haven't seen unless they click reset.
    if (visitedRandomWords.has(randomWordOne)) {
      while (visitedRandomWords.has(randomWordOne)) {
        randomWordOne = sample(words);
      }
    }

    if (visitedRandomWords.has(randomWordTwo)) {
      while (visitedRandomWords.has(randomWordTwo)) {
        randomWordTwo = sample(words);
      }
    }

    const resultWord = (randomWordOne + randomWordTwo).toUpperCase();

    if (enterNumsForMe) {
      const randomNum = getRandomInt(56, 1337);
      setIgn(resultWord + randomNum);
    } else {
      setIgn(resultWord + manuallyEnteredNumbers);
    }

    setManuallyEnteredNumbers('');
  };

  const handleReset = () => {
    setIgn('');
    setManuallyEnteredNumbers('');
    setVisitedRandomWords(new Set());
  };

  return (
    <div className="App">
      <div className="centered">
        <h1>tyler1 ign generator</h1>
        {ign ? <h2>IGN: {ign}</h2> : null}

        {!error ? (
          <form onSubmit={handleCreateIgn}>
            <div>
              {!enterNumsForMe ? (
                <TextField
                  variant="filled"
                  style={{ background: '#fff' }}
                  placeholder="enter a number"
                  type="number"
                  required={enterNumsForMe === false}
                  value={manuallyEnteredNumbers}
                  onChange={(e) =>
                    setManuallyEnteredNumbers(String(e.target.value))
                  }
                />
              ) : null}
            </div>
            <br />
            <div>
              <Button
                variant="contained"
                color="secondary"
                style={{ background: 'purple' }}
                onClick={() => setEnterNumsForMe((prevState) => !prevState)}>
                {!enterNumsForMe
                  ? 'Enter the numbers for me.'
                  : 'Enter numbers manually'}
              </Button>
            </div>
            <br />
            <div>
              <Button type="submit" variant="contained" color="primary">
                Generate IGN
              </Button>

              {ign ? (
                <>
                  &nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}>
                    Reset
                  </Button>
                </>
              ) : null}
            </div>
          </form>
        ) : (
          <h1>sorry! something went wrong.</h1>
        )}
      </div>

      <footer>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/DannyMichaels/tyler1-ign-generator">
          source code
        </a>
      </footer>
    </div>
  );
}

export default App;
