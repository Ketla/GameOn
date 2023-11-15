const Footer = ({ length }) => {

  return (
    <footer>
      <p>{length} {length === 1 ? "Player" : "Players"}</p>
    </footer>
  )
}

export default Footer