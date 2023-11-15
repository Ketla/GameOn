import Header from './Header';
import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const divideIntoTeams = (players) => {
  const shuffledPlayers = shuffleArray([...players]); // Shuffle a copy of the players array
  const half = Math.ceil(shuffledPlayers.length / 2);
  const teamOne = shuffledPlayers.slice(0, half);
  const teamTwo = shuffledPlayers.slice(half);
  return { teamOne, teamTwo };
};

function Game() {
  const API_URL = 'http://localhost:3500/players';
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState({ teamOne: [], teamTwo: [] });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayers(data);
        setTeams(divideIntoTeams(data)); // Randomize teams after fetching
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (isLoading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleGameAction = () => {
    const newTeams = divideIntoTeams(players);
    setTeams(newTeams);
    console.log(newTeams);
  };

  if (isLoading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="Game">
      <Header />
      <main>
      <div className="game-board">
  <div className="team-section team-one">
    <h2 className="team-title">Team One</h2>
    <ul className="player-list">
      {teams.teamOne.map(player => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  </div>
  <div className="team-section team-two">
    <h2 className="team-title">Team Two</h2>
    <ul className="player-list">
      {teams.teamTwo.map(player => (
        <li key={player.id}>{player.name}</li>
      ))}
    </ul>
  </div>
</div>
        <div className="game-info">
          {/* Game info here */}
        </div>
        <button onClick={handleGameAction}>Randomize Teams</button>
      </main>
    </div>
  );
}

export default Game;
