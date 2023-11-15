import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddPlayer = ({ newPlayer, setNewPlayer, handleSubmit }) => {
const inputRef = useRef();

return (
  <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor='addPlayer'>Add Player</label>
        <input
            autoFocus
            ref={inputRef}
            id='addPlayer'
            type='text'
            placeholder='Add Player'
            required
            maxLength={12}
            minLength={5}
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
        />
        <button
            className="addPlayerButton"
            type="submit"
            aria-label="Add Player"
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus />
        </button>
  </form>
)
}

export default AddPlayer