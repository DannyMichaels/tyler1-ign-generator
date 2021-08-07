import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const sample = (array) => array[Math.floor(Math.random() * array.length)];

function App() {
  const API_URL = (numberOfWords) => `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`
  const [words, setWords] = useState([]);
  const [error, setError] = useState(false);
  const [numbers, setNumbers] = useState('')
  const [ign, setIgn] = useState('');

  useEffect(() => {
    axios.get(API_URL(1000)).then(({ data }) => setWords(data)).catch((_err) => setError(true));
  }, [])
  
  const handleCreateIgn = (e) => {
    e.preventDefault();
    const randomWordOne = sample(words);
    const randomWordTwo = sample(words);

    const resultWord = (randomWordOne + randomWordTwo).toUpperCase()
    console.log({resultWord})
    setIgn(resultWord + numbers)
  }

  return (
    <div className="App">
      <h1>tyler1 ign generator</h1>
      {ign ? <h2>IGN: {ign}</h2> : null}

      {!error ? <form onSubmit={handleCreateIgn}>
        <div>
         
          <input
            placeholder="enter a number"
            type="number" onChange={(e) => setNumbers(String(e.target.value))}
          />
        </div>
        <br />
        <button>Generate IGN</button>
      </form> : <>sorry! something went wrong.</>}
    </div>
  );
}

export default App;
