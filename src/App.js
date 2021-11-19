import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Modal from "./components/Modal"; 
import { LinearProgress } from "@material-ui/core";

                

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [notes,setNotes] = useState([
    {
      id: nanoid(),
      title: "Teste #1",
      type: 'work',
      text: "This is my first work note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      title: "Teste #2",
      type: 'personal',
      text: "This is my second note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      title: "Teste #3",
      type: 'home',
      text: "This is my third note",
      date: "17/11/2021"
    },
]);



  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [noteTitle, setNoteTitle] = useState('');


  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes]);

//Create

  const AddNote = (title, type, text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title,
      type: type,
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    console.log(newNotes);
    setNotes(newNotes);
  }

//Delete

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

 
  //Add note - Modal

  const [noteText,setNoteText] = useState('');

  const handleChange = (event) => {
      setNoteText(event.target.value);
  }

  const handleTitle = (event) => {
    setNoteTitle(event.target.value);
  }

  const handleSaveClick = () => {
    if(noteText.trim().length > 0){
      AddNote(noteTitle, selectedOption, noteText);
      setNoteText('');
      setNoteTitle('');
    } 
    setIsModalVisible(false)
  }

  // Update

  const upNote = (id, noteText) => {
    if(noteText.trim().length > 0){
      const newNotes = notes.map(note => {
        if (note.id === id) note.text = noteText
        return note
      })
      console.log(newNotes);
      setNotes(newNotes);
      setNoteText('');
    } 
    setIsModalVisible(false)
  }

  const [s, setS] = useState("all");

  return(
    <div>
      <div className="container">
          <Search handleSearchNote={setSearchText} />
          <div className="buttons-header">
          <button className="all-btn" onClick={()=>{setS("all")}}>All</button>
            <div className="home-group">
              <button className="home-btn" onClick={()=>{setS("home")}}>Home</button>
              <div className="home-ball"></div>
            </div>
            <div className="work-group">
              <button className="work-btn" onClick={()=>{setS("work")}}>Work</button>
              <div className="work-ball"></div>
            </div>
            <div className="personal-group">
              <button className="personal-btn" onClick={()=>{setS("personal")}}>Personal</button>
              <div className="personal-ball"></div>
            </div>
            <button className="open" onClick={() => setIsModalVisible(true)}>+ ADD NOTE</button>
          </div>
          
          
          {s==="all" ? <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/>
          : <NotesList notes={notes.filter(n => n.type === s )} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/> }
          
          {isModalVisible ? <Modal className="modal-newnote" onClose={() => setIsModalVisible(false)}>
          <div className="note new">
            <div className="header-notenew">
              <textarea rows="1" cols="10" placeholder="Add title..." onChange={handleTitle} value={noteTitle} className="title-field"></textarea>
              <select className="select-newnote" onChange={(e)=>{
                const selectedItem = e.target.value;
                console.log(selectedItem);
                setSelectedOption(selectedItem);
              }}>
                <option value="notype">Select a category:</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <textarea rows="8" cols="10" placeholder="Add description..." onChange={handleChange} value={noteText} className="description-field">
        
            </textarea>
            <div className="note-footer-create">
                <button className="cancel" onClick={() => setIsModalVisible(false)}>CANCEL</button>
                <button className="save" onClick={handleSaveClick}>ADD</button>
            </div>
        </div>
          </Modal> : null}
      </div>
    </div>
  )
};

export default App;