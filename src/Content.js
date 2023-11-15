import PlayerList from "./PlayerList";

const Content = ({ players, handleDelete }) => {

  return (
      <>
       {players.length ? (
          <PlayerList
          players={players}
          handleDelete={handleDelete}
          />
        ) : (
          <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
        )}
      </>
    )
  }

export default Content