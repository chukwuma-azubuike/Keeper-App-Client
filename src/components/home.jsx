import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import useToken from '../useToken';
import Login from './login';

function Home() {

  const { token, setToken } = useToken();
  const [notes, setNotes] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  const url = `${process.env.API_URL}/home`;

  if (!token) { return <div><Login /></div> }

  // API call to retrieve user's notes
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      const reader = (res.body).getReader();
      reader.read().then(res => res.value)
        .then(res => {
          const body = new TextDecoder().decode(res)
          const notesIn = JSON.parse(body).notes;
          setNotes(notesIn) //Render notes retrieved from DB
          return notesIn
        })
      // .then(res => console.log(JSON.parse(res)))
    })
    .catch(err => {
      setApiResponse(`Err ${err}`)
      // return <div><Login/></div>
    });

  // API call to add user's notes
  function addNote(newNote) {
    setNotes(prevNotes =>
      [...prevNotes, newNote]
    );

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newNote)
    })
      .then(res => {
        const reader = (res.body).getReader();
        reader.read().then(res => res.value)
          .then(res => {
            const body = new TextDecoder().decode(res)
            return body
          })
      })
      .catch(err => setApiResponse(err));
  }

  //API call to delete note
  function deleteNote(id) {
    const data = { id: id }
    fetch(`${url}/delete`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        const reader = (res.body).getReader();
        reader.read().then(res => res.value)
          .then(res => {
            const body = new TextDecoder().decode(res)
            return body
          })
      })
      .catch(err => console.log(err));

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
