import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea"

// import { render } from "@testing-library/react";

function Home() {

  const [apiResponse, setApiResponse] = useState('');

  //API calls
  fetch('http://localhost:9000/users')
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => setApiResponse(`Error --> ${err}`));

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes, index) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem !== id;
      });
    });
  }

  return (
    <div>
      <p>{apiResponse}</p>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );

}

export default Home;
