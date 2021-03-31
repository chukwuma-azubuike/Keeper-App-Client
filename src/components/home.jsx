import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea"
import { BrowserRouter, Redirect } from 'react-router-dom'

// import { render } from "@testing-library/react";

function Home() {

  const [notes, setNotes] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  //API calls
  fetch('http://localhost:9000/home')
    .then(res => {
      const reader = (res.body).getReader();
      reader.read().then(res => res.value)
        .then(res => {
          const body = new TextDecoder().decode(res)
          console.log(body)
          if (body.status === 'OK') {
            setNotes(body.notes) //Render notes retrieved from DBS
          }
        })
        .then(res => console.log(res))
    })
    .catch(err => setApiResponse(`Error --> ${err}`));

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    const url = 'http://localhost:9000/home';
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: true,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(notes)
    })
      .then(res => console.log(res))
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
