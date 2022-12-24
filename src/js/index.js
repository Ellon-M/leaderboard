import '../style.css';
import Leaderboard from './leaderboard.js';
const scoresTable = document.querySelector('.scores-table-data');

const newGame = new Leaderboard();
newGame.start();
const scores = await newGame.getAllScores();

const populateTable = () => {
    
}

populateTable();