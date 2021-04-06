import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import useToken from '../useToken';
import Login from './login';

function Home() {

  const { token, setToken } = useToken();
  const [notes, setNotes] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  const url = 'http://localhost:9000/home';

  if (!token) { return <div><Login setToken={setToken} /></div> }

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
          // console.log(notes);
          return notesIn
        })
        .then(res => console.log(JSON.parse(res)))
    })
    .catch(err => setApiResponse(`Err ${err}`));

  // API call to add user's notes
  function addNote(newNote) {
    setNotes(prevNotes =>
      [...prevNotes, newNote]
    );

    fetch(url, {
      method: 'POST',
      // mode: 'cors',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(notes)
    })
      .then(res => {
        const reader = (res.body).getReader();
        reader.read().then(res => res.value)
          .then(res => {
            const body = new TextDecoder().decode(res)
            // console.log(body)
            // if (body.status === 'OK') {
            //   setNotes(body.notes) //Render notes retrieved from DB
            // }
            return body
          })
        // .then(res => console.log(JSON.parse(res).message))
      })
      .catch(err => setApiResponse(`Err ${err}`));
  }

  //API call to delete note
  function deleteNote(id) {

    fetch(url, {
      method: 'POST',
      // mode: 'cors',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: id
    }).then(res => console.log(res))
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
