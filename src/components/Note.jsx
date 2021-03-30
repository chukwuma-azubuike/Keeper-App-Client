import React, { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import Grow from '@material-ui/core/Grow';

function Note(props) {

  const [deleteNoteTransition, setDeleteNoteTransition] = useState(true)

  function handleClick() {
    setDeleteNoteTransition(false)
    setTimeout(() => { props.onDelete(props.id) }, 1000)
  }

  const [mouseHover, setMouseHover] = useState(false);

  return (
    <Grow in={deleteNoteTransition}>
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button
          style={
            { color: mouseHover ? '#b3b1ae' : '#07223D', backgroundColor: 'white' }
          }
          onMouseOver={() => {
            setMouseHover(true)
          }}
          onMouseOut={() => {
            setMouseHover(false)
          }}
          onClick={handleClick}><DeleteIcon /></button>
      </div>
    </Grow>
  );
}

export default Note;
