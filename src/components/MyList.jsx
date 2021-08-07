export default function MyList({ showBackground, listItems }) {
  return (
    <div
      className="centered"
      style={{
        background: showBackground ? 'rgba(255,255,255, 0.5)' : '',
      }}>
      <h1>My List:</h1>
      <ul className="mylist-ul">
        {listItems.map((ign, key) => (
          <li style={{ textAlign: 'left' }} key={key}>
            {ign}
          </li>
        ))}
      </ul>
    </div>
  );
}
