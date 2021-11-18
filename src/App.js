import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Header from "./components/Header";

import Modal from "./components/Modal"; 


                

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [notes,setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      text: "This is my second note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      text: "This is my third note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      text: "This is my new note",
      date: "17/11/2021"
    },
]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes]);

  const AddNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  //Add note - Modal

  const [noteText,setNoteText] = useState('');

  const handleChange = (event) => {
      setNoteText(event.target.value);
  }


  const handleSaveClick = () => {
    if(noteText.trim().length > 0){
      AddNote(noteText);
      setNoteText('');
    } 
    setIsModalVisible(false)
  }

 

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
          <Header handleToggleDarkMode={setDarkMode}/>
          <Search handleSearchNote={setSearchText}/>
          <button className="open" onClick={() => setIsModalVisible(true)}>+ ADD NOTE</button>
          <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={handleSaveClick}/>
          {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)}>
          <div className="note new">
            <textarea rows="8" cols="10" placeholder="Type to add a new note" onChange={handleChange} value={noteText}>
        
            </textarea>
            <div className="note-footer">
                <button className="save" onClick={handleSaveClick}>ADD</button>
                <button className="cancel" onClick={() => setIsModalVisible(false)}>CANCEL</button>
            </div>
        </div>
          </Modal> : null}
      </div>
    </div>
  )
};

export default App;