import LinePlayer from "./LinePlayer";

function PlayerList({ players, handleDelete }) {

  return (
    <ul>
      {players.map((player) => (
        <LinePlayer
          key={player.id}
          player={player}
          handleDelete={handleDelete}
        />
    ))}
  </ul>
  )
  }

export default PlayerList