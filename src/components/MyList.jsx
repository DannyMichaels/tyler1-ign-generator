import Button from '@material-ui/core/button';
import DeleteIcon from '@material-ui/icons/DeleteForever';

export default function MyList({ showBackground, listItems, removeFromList }) {
  return (
    <div
      className="centered"
      style={{
        background: showBackground ? 'rgba(255,255,255, 0.5)' : '',
      }}>
      <h1>My List:</h1>
      <ul className="mylist-ul">
        {listItems.length > 0 ? (
          listItems.map((ign, index) => (
            <li key={index}>
              <div>{ign}</div>

              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => removeFromList(index)}>
                  <DeleteIcon />
                  remove from list
                </Button>
              </div>
            </li>
          ))
        ) : (
          <h1>No IGNs added!</h1>
        )}
      </ul>
    </div>
  );
}
