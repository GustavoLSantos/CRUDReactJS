import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Modal from "./components/Modal"; 
import { LinearProgress } from "@material-ui/core";
import styled from 'styled-components';

var selected = 0;      

const App = () => {
   //Definition of the states used
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
  const [manyChecked, setManyChecked] = useState(0);
  const [s, setS] = useState("all");
  const [noteText,setNoteText] = useState('');

  //Definition of the amount of notes
  const notesSize = Object.keys(notes).length

  //Get the local storage notes using the key:react-notes-app-data
  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes);
    }
  }, []);

  //Save the notes on the local storage using the key: react-notes-app-data
  useEffect(()=>{
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes]);

  //Create a note function
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
    setNotes(newNotes);
  }

//Delete notes
  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

 
  //Process of adding the note, gets the value when changed  - Modal
  const handleChange = (event) => {
      setNoteText(event.target.value);
  }

  const handleTitle = (event) => {
    setNoteTitle(event.target.value);
  }

  //Creates the note when clicked, checking if it has something written, erase the fields after saving and closes the modal
  const handleSaveClick = () => {
    if(noteText.trim().length > 0){
      AddNote(noteTitle, selectedOption, noteText);
      setNoteText('');
      setNoteTitle('');
    } 
    setIsModalVisible(false)
  }

  // Update notes, only allowing to change the text, not the title or type
  const upNote = (id, noteText) => {
    if(noteText.trim().length > 0){
      const newNotes = notes.map(note => {
        if (note.id === id) note.text = noteText
        return note
      })
      setNotes(newNotes);
      setNoteText('');
    } 
    setIsModalVisible(false)
  }

  //Checks if the note's checkbox is actually checked. If it is, adds one to the counter and puts it on the state.
  const updateCheck = (checkAmount) => {
    var x = selected + checkAmount;
    setManyChecked(x);
  }
  //Var for the progress bar. Calculates the done percentage.
  var progress = manyChecked/(notesSize/100)

  //Styled-Components used on elements that repeated along the code

  const AllBtn = styled.button`
  background-color: #69BCFF;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  width: 6rem;
  margin-bottom: 30px;
  align-items: center;
  margin-right: 10px;
  `

  const TypeBtn = styled.button`
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  width: 6rem;
  margin-bottom: 30px;
  align-items: center;
  color: #808080;
  background-color: transparent;
  font-size: 16px;
  margin-right: 10px;
  `
  const HomeBall = styled.div`
  width: 5px;
  height: 5px;
  background-color: #FF9100;
  border-radius: 50%;
  position: relative;
  top: -37px;
  right: -45px;
  `
const WorkBall = styled.div`
 width: 5px;
  height: 5px;
  background-color: #5C6BC0;
  border-radius: 50%;
  position: relative;
  top: -37px;
  right: -45px; 
`

const PersonalBall = styled.div`
 width: 5px;
  height: 5px;
  background-color: #66BB6A;
  border-radius: 50%;
  position: relative;
  top: -37px;
  right: -45px; 
`

const ProgressBar = styled.div`
padding-bottom: 30px;
`
const Progressh2 = styled.h2`
font-size: 18px;
  color: #626262;
`

const SelectType = styled.select`
  height: 34px;
  font-size: 20px;
  background-color: #F4F4F4;
  width: 50vh;
  border: none;
`

const FormButton = styled.button`
  color: #2196F3;
  background-color: transparent;
  border: none;
  border-radius: 15px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  &:hover{
        color: #4dabf8;
        transform: scale(110%);
        transition: all 0.2s ease-in;
    }
`

  return(
    <div>
      <div className="container">        
          <Search handleSearchNote={setSearchText} />
          <div className="buttons-header">
          <AllBtn onClick={()=>{setS("all")}}>All</AllBtn>
            <div className="home-group">
              <TypeBtn onClick={()=>{setS("home")}}>Home</TypeBtn>
              <HomeBall></HomeBall>
            </div>
            <div className="work-group">
              <TypeBtn onClick={()=>{setS("work")}}>Work</TypeBtn>
              <WorkBall></WorkBall>
            </div>
            <div className="personal-group">
              <TypeBtn onClick={()=>{setS("personal")}}>Personal</TypeBtn>
              <PersonalBall></PersonalBall>
            </div>
            
            <button className="open" onClick={() => setIsModalVisible(true)}><span class="material-icons md-light">add</span> ADD NOTE</button>
          </div>
          <ProgressBar>
            <Progressh2>You have {manyChecked}/{notesSize} notes completed</Progressh2>
            <LinearProgress variant="determinate" value={progress}/>  
          </ProgressBar>

          {s==="all" ? <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleSelectedBoxes={updateCheck} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/>
          : <NotesList notes={notes.filter(n => n.type === s )} handleSelectedBoxes={updateCheck} handleAddNote={AddNote} handleDeleteNote={deleteNote} handleUpdateClick={upNote}/> }
          
          {isModalVisible ? <Modal className="modal-newnote" onClose={() => setIsModalVisible(false)}>
          <div className="note new">
            <div className="header-notenew">
              <textarea rows="1" cols="10" placeholder="Add title..." onChange={handleTitle} value={noteTitle} className="title-field"></textarea>
              <SelectType onChange={(e)=>{
                const selectedItem = e.target.value;
                console.log(selectedItem);
                setSelectedOption(selectedItem);
              }}>
                <option value="notype">Select a category:</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="personal">Personal</option>
              </SelectType>
            </div>
            <textarea className="description-field" rows="8" cols="10" placeholder="Add description..." onChange={handleChange} value={noteText} ></textarea>
            <div className="note-footer-create">
                <FormButton onClick={() => setIsModalVisible(false)}>CANCEL</FormButton>
                <FormButton onClick={handleSaveClick}>ADD</FormButton>
            </div>
        </div>
          </Modal> : null}
      </div>
    </div>
  )
};

export default App;