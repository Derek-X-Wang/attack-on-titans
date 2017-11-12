import axios from 'axios';

const requestUrl = 'https://wi7z6vqv2g.execute-api.us-east-1.amazonaws.com/v1';

function getProblem(difficulty, language) {
  const url = `${requestUrl}/problem`;
  axios.get(url, {
    params: {
      difficulty,
      language,
    },
  })
  .then((response) => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch((error) => {
    console.log(error);
  });
}

export default {
  getProblem,
};
