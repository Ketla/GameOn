import Header from './Header';
import AddPlayer from './AddPlayer';
import Content from './Content';
import Footer from './Footer';
import StartGame from './StartGame';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'https://getpantry.cloud/apiv1/pantry/e6ee784a-2715-4816-9473-1bc1000b2bec/basket/players';

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('')
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

      const fetchPlayers = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw Error('Did not receive expected data');
          const listPlayers = await response.json();
          setPlayers(listPlayers);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      //Simulation from a server with 2 seconds delay
      setTimeout(() => {
        fetchPlayers();
      }, 2000)
      
  }, [])

  const addPlayer = async () => {
    const id = players.length ? players[players.length - 1].id + 1 : 1;
    const rating = 1000; // Default rating, change as needed
    const name = newPlayer; // Name from state
    const theNewPlayer = { id, rating, name };
    const listPlayers = [...players, theNewPlayer];
    setPlayers(listPlayers);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theNewPlayer)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);

  };


  const handleDelete = async (id) => {
    // Show confirm dialog and store the user's response
    const isConfirmed = window.confirm("Are you sure? This will remove the player.");

    // Check the user's response
    if (isConfirmed) {
      const listPlayers = players.filter((player) => player.id !== id);
      setPlayers(listPlayers);

      const deleteOptions = { method: 'DELETE' };
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
    } else {
      // User clicked 'Cancel', so you might want to handle that case as well
      console.log("Deletion cancelled.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPlayer) return;
    addPlayer(newPlayer);
    setNewPlayer('');
  }

  return (
    <div className="App">
     <Header  />
     <AddPlayer 
        newPlayer={newPlayer}
        setNewPlayer={setNewPlayer}
        handleSubmit={handleSubmit}
     />
     <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style ={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
        players={players}
        handleDelete={handleDelete}
        />}
        <StartGame players={players} />
     </main>
     <Footer length={players.length} />
    </div>
  );
}

export default App;
