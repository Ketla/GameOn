import { useNavigate } from 'react-router-dom';

function StartGame({ players }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game'); // Navigate to the game page
    console.log('lol')
  };

  return (
    <>
      {players.length > 0 && (
        <button className="startGameButton" onClick={handleStartGame}>
          START GAME
        </button>
      )}
    </>
  );
}

export default StartGame;