import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_URL = (numberOfWords) => `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`
  const [words, setWords] = useState([])
  const [ign, setIgn] = useState('');

  useEffect(() => {
    axios.get(API_URL(1000)).then(({data}) => setWords(data))
  }, [])
  
  const handleCreateIgn = () => {
    setIgn(prev => prev)
  }

  return (
    <div className="App">
      {words.map((w) => <h1>{w}</h1>)}

      <button onClick={handleCreateIgn}>Generate IGN</button>
    </div>
  );
}

export default App;
