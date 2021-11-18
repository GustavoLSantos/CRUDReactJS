
import { MdDeleteForever } from 'react-icons/md';
import React from 'react';
import { useState } from "react";
import Modal from "./Modal";          
import { BsFillBrushFill } from 'react-icons/bs';

const Note = ({ handleAddNote, handleUpdateClick, id, text, date, handleDeleteNote }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteText,setNoteText] = useState('');
    const handleChange = (event) => {
        setNoteText(event.target.value);
    }


    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever onClick={() => handleDeleteNote(id)} className='delete-icon' size='1.3em' />
                <button onClick={() => setIsModalVisible(true)}>Open</button>
                {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)}>
                <textarea rows="8" cols="10" placeholder={text} onChange={handleChange} value={noteText}>
                
                </textarea>
                <button className="save" onClick={() => handleUpdateClick(id, noteText)}>ADD</button>
                <button className="cancel" onClick={() => setIsModalVisible(false)}>CANCEL</button>
                </Modal> : null}
                <BsFillBrushFill/>
            </div>
        </div>
    )
};

export default Note;