import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Home({
  words,
  showBackground,
  error,
  addToList,
  list,
}) {
  const [ign, setIgn] = useState('');
  const [manuallyEnteredNumbers, setManuallyEnteredNumbers] = useState('');
  const [enterNumsManually, setEnterNumsManually] = useState(false);
  const [visitedRandomWords, setVisitedRandomWords] = useState(new Set()); // get unique generated IGNS to avoid boredom

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

    if (enterNumsManually) {
      setIgn(resultWord + manuallyEnteredNumbers);
      setManuallyEnteredNumbers('');
    } else {
      const randomNum = getRandomInt(56, 1337);
      setIgn(resultWord + randomNum);
    }
  };

  const handleReset = () => {
    setIgn('');
    setManuallyEnteredNumbers('');
    setVisitedRandomWords(new Set());
  };

  const tweetText = `I just used Tyler1 IGN Generator and got ${ign}!, try it at https://tyler1-ign-generator.netlify.app/`;

  return (
    <>
      <div
        className="centered"
        style={{
          background: showBackground ? 'rgba(255,255,255, 0.5)' : '',
        }}>
        <h1>Tyler1 IGN Generator</h1>
        {ign ? (
          <>
            <h2 className="show-ign">IGN: {ign}</h2>
            <div className="centered-content">
              {!list.find((item) => item === ign) ? (
                <>
                  <span
                    className="add-to-list-btn"
                    onClick={() => addToList(ign)}>
                    <AddIcon />
                    &nbsp; Add To List
                  </span>
                </>
              ) : (
                <h3>This IGN is in your list!</h3>
              )}
              <a
                className="tweet-btn"
                href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                target="_blank"
                rel="noreferrer">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/windev-contacts-2/512/twitter_button-512.png"
                  alt="tweet"
                  width="20px"
                />
                Tweet
              </a>
            </div>
            <br />
          </>
        ) : null}

        {!error ? (
          <form onSubmit={handleCreateIgn}>
            <div>
              {enterNumsManually ? (
                <TextField
                  variant="filled"
                  style={{ background: '#fff' }}
                  placeholder="enter a number"
                  type="number"
                  required={enterNumsManually}
                  value={manuallyEnteredNumbers}
                  onChange={(e) => {
                    // allow 4 max characters to be entered (using slice), maxLength doesn't work on input type number
                    // math.max(0, value) to avoid negative nums
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
                onClick={() => setEnterNumsManually((prevState) => !prevState)}>
                {enterNumsManually
                  ? 'Enter the numbers for me'
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
    </>
  );
}
