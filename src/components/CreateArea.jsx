import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Collapse from '@material-ui/core/Collapse';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setisExpanded] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    let { title, content } = note;
    (title !== '' && content !== '') && props.onAdd(note) //Render nothing if fields are empty
    // setNote({
    //   title: "",
    //   content: ""
    // });
  }

  // function recycleNote(event) {
  //   props.onRecycle()
  // }

  return (
    <div>
      <form className="create-note">
        {isExpanded &&
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />}
        <Collapse in={true}>
          <textarea
            name="content"
            onClick={() => {
              setisExpanded(true)
            }}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={!isExpanded ? 1 : 3}
          />
        </Collapse>
        {isExpanded &&
          <Zoom in={true}>
            <Fab
              onClick={submitNote}
            ><AddIcon /></Fab>
          </Zoom>}
      </form>
      {/* <Fab
        onClick={recycleNote}
      ><AddIcon /></Fab> */}
    </div>
  );
}

export default CreateArea;
