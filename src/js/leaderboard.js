export default class Leaderboard {
  constructor() {
    this.name = document.getElementById('name');
    this.score = document.getElementById('score');
    this.refresh = document.querySelector('.refresh-btn');
    this.submit = document.getElementById('submit-new-score');
    this.message = document.querySelector('.message');
    this.scoresTable = document.querySelector('.scores-table-data');
  }

  start() {
    this.initEvents();
  }

  initEvents = () => {
    // post request
    this.submit.addEventListener('click', () => {
      if (this.name.value !== '' && this.score.value !== '') {
        this.setScore(this.name.value, this.score.value);
        this.message.innerHTML = 'Score submitted successfully.';
        this.message.style.color = '#16cc50';
        this.message.style.display = 'block';
      } else {
        this.message.innerHTML = 'Values can not be null';
        this.message.style.color = '#e8152a';
        this.message.style.display = 'block';
      }
      this.name.value = null;
      this.score.value = null;
    });

    // get request
    this.refresh.addEventListener('click', async () => {
      const scores = await this.getAllScores();
      this.scoresTable.innerHTML = '';
      scores.sort((a, b) => a.score - b.score).forEach((score) => {
        this.scoresTable.innerHTML += `
        <p>
          <span>${score.user}</span>
          <span>${score.score}</span>
        </p>
      `;
      });
    });
  }

   getGameID = async () => {
     const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name: "Ellon's New Game" }),
     });

     const id = await response.json();
     return id;
   }

  getAllScores = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5HY3pDVyPqBNmP5MFxu9/scores/');
    const scores = await response.json();
    return scores.result;
  }

  setScore = async (name, score) => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5HY3pDVyPqBNmP5MFxu9/scores/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    });

    const data = await response.json();
    return data;
  }
}