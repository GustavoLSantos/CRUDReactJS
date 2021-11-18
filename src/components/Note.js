
import { MdDeleteForever } from 'react-icons/md';
import React from 'react';
import { useState } from "react";
import Modal from "./Modal";          
import { BsFillBrushFill } from 'react-icons/bs';

const Note = ({ handleUpdateClick, id, type, text, date, handleDeleteNote }) => {

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
                <BsFillBrushFill onClick={() => setIsModalVisible(true)}/>
                {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)}>
                <div className="note new">
                    <textarea className="update-note" rows="8" cols="10" placeholder={text} onChange={handleChange} value={noteText}>
                    </textarea>
                    <div className="note-footer">
                        <button className="save" onClick={() => handleUpdateClick(id, noteText)}>UPDATE</button>
                        <button className="cancel" onClick={() => setIsModalVisible(false)}>CANCEL</button>
                    </div>
                </div>
                </Modal> : null}
            </div>
        </div>
    )
};

export default Note;