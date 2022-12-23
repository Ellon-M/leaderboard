export default class Leaderboard {
  constructor() {
    this.name = document.getElementById('name');
    this.score = document.getElementById('score');
    this.refresh = document.querySelector('.refresh-btn');
    this.submit = document.getElementById('submit-new-score');
    this.message = document.querySelector('.message');
    this.scores = [];
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
    this.refresh.addEventListener('click', () => {
      this.getAllScores();
    });
  }

   getGameID = async () => {
     const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name: "Ellon's Game" }),
     });

     const id = await response.json();
     return id;
   }

  getAllScores = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/POn30IaK9AvWMr91XHqc/scores/');
    const scores = await response.json();
    scores.result.forEach((score) => {
      this.scores.push(score);
    });
  }

  setScore = async (name, score) => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/POn30IaK9AvWMr91XHqc/scores/', {
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