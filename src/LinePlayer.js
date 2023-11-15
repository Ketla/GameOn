import { FaTrashAlt } from "react-icons/fa";

const LinePlayer = ({ player, handleDelete }) => {
  return (
<li className="player">
        <label>{player.name}</label>
        <FaTrashAlt
            onClick={() => handleDelete(player.id)}
            role ="button" 
            tabIndex="0"
            aria-label={`Delete ${player.player}`} 
        />
</li>
  )
}

export default LinePlayer