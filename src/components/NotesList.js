import Note from './Note';

const NotesList = ({ handleSelectedBoxes, handleUpdateClick, notes, handleAddNote, handleDeleteNote, updateNotes }) => {
    return (
        <div className="notes-list">
            {notes.map((note)=> (
                <Note id={note.id} title={note.title} type={note.type} text={note.text} date={note.date} handleAddNote={handleAddNote} handleSelectedBoxes={handleSelectedBoxes} handleDeleteNote={handleDeleteNote} handleUpdateClick={handleUpdateClick}/>
            ))}
        </div>
    )
}

export default NotesList;