import axios from 'axios';

export default class Api {
  getAllWords = async function () {
    return axios
      .get('https://random-word-api.herokuapp.com/all')
      .then(({ data }) => data);
  };

  getWordsByNumber = async function (numberOfWords) {
    return axios
      .get(`https://random-word-api.herokuapp.com/word?number=${numberOfWords}`)
      .then(({ data }) => data);
  };
}
