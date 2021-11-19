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
      type: 'work',
      text: "This is my first work note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      type: 'personal',
      text: "This is my second note",
      date: "17/11/2021"
    },
    {
      id: nanoid(),
      type: 'home',
      text: "This is my third note",
      date: "17/11/2021"
    },
]);



  const [searchText, setSearchText] = useState('');
  const [showHomeComponent, setShowHomeComponent] = useState(false);
  const [showWorkComponent, setShowWorkComponent] = useState(false);
  const [showPersonalComponent, setShowPersonalComponent] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

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

//Create

  const AddNote = (type, text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
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


  const handleSaveClick = () => {
    if(noteText.trim().length > 0){
      AddNote(selectedOption, noteText);
      setNoteText('');
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

  const [s, setS] = useState("personal");

  const offButtonClick = () =>{
    setShowWorkComponent(false)
    setShowHomeComponent(false)
    setShowPersonalComponent(false)
    setShowComponent(true)
 } 

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
          <Header handleToggleDarkMode={setDarkMode}/>
          <Search handleSearchNote={setSearchText}/>
          
          <button className="all" onClick={()=>{setS("all")}}>All</button>
          <button className="home" onClick={()=>{setS("home")}}>Home</button>
          <button className="work" onClick={()=>{setS("work")}}>Work</button>
          <button className="personal" onClick={()=>{setS("personal")}}>Personal</button>
          <button className="open" onClick={() => setIsModalVisible(true)}>+ ADD NOTE</button>
          {s==="all" ? <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/>
          : <NotesList notes={notes.filter(n => n.type === s )} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/> }
          
          {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)}>
          <div className="note new">
            <textarea rows="8" cols="10" placeholder="Type to add a new note" onChange={handleChange} value={noteText}>
        
            </textarea>
            <div className="note-footer">
            <select onChange={(e)=>{
              const selectedItem = e.target.value;
              console.log(selectedItem);
              setSelectedOption(selectedItem);
            }}>
              <option value="notype">Choose a type:</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
              <option value="personal">Personal</option>
            </select>
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