import axios from 'axios';

const ENDPOINT = 'https://wi7z6vqv2g.execute-api.us-east-1.amazonaws.com/v1';

function pickQuestion(difficulty, language, records) {
  const d = difficulty.toLowerCase();
  const l = language.toLowerCase();
  const used = [];
  records.forEach((record) => {
    used.push(record.index);
  });
  const url = `${ENDPOINT}/problem`;
  return axios.get(url, {
    params: {
      d,
      l,
      c: 'google',
      u: used.join(','),
    },
  });
}

export default {
  pickQuestion,
};
