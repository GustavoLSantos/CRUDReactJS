import Note from './Note';

const NotesList = ({ handleUpdateClick, notes, handleAddNote, handleDeleteNote, updateNotes }) => {
    return (
        <div className="notes-list">
            {notes.map((note)=> (
                <Note id={note.id} type={note.type} text={note.text} date={note.date} handleAddNote={handleAddNote} handleDeleteNote={handleDeleteNote} handleUpdateClick={handleUpdateClick}/>
            ))}
        </div>
    )
}

export default NotesList;