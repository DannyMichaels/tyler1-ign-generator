import { useEffect, useState } from 'react';
import Api from './api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

const BACKGROUND_IMG = 'https://i.redd.it/9rlwdb2br9jz.png';

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [manuallyEnteredNumbers, setManuallyEnteredNumbers] = useState('');
  const [enterNumsForMe, setEnterNumsForMe] = useState(true);
  const [ign, setIgn] = useState('');
  const [visitedRandomWords, setVisitedRandomWords] = useState(new Set()); // get unique generated IGNS to avoid boredom
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    const api = new Api();

    api
      .getAllWords()
      .then((result) => setWords(result))
      .catch((_err) => setError(true));
  }, []);

  const handleCreateIgn = (e) => {
    e.preventDefault();

    // let people always get names that they haven't seen unless they click reset.
    const unvisitedWords = words.filter(
      (word) => !visitedRandomWords.has(word)
    );

    let randomWordOne = sample(unvisitedWords),
      randomWordTwo = sample(unvisitedWords);

    setVisitedRandomWords(
      (prevState) => new Set([...prevState, randomWordOne, randomWordTwo])
    );

    const resultWord = `${randomWordOne}${randomWordTwo}`.toUpperCase();

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
    <div
      className="App"
      style={{
        backgroundImage: showBackground ? `url(${BACKGROUND_IMG})` : '',
        minHeight: '100vh',
      }}>
      <div
        className="centered"
        style={{
          background: showBackground ? 'rgba(255,255,255, 0.5)' : '',
        }}>
        <h1>Tyler1 IGN Generator</h1>
        {ign ? <h2 className="show-ign">IGN: {ign}</h2> : null}

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
                  onChange={(e) => {
                    // allow 4 max characters to be entered (using slice), maxLength doesn't work on input type number
                    setManuallyEnteredNumbers(
                      Math.max(0, Number(e.target.value)).toString().slice(0, 4)
                    );
                  }}
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
