import React from 'react';
import { useState } from "react";
import Modal from "./Modal";          
import Checkbox from '@material-ui/core/Checkbox';
import { LinearProgress } from '@material-ui/core';

export var selected = 0;

const Note = ({ handleUpdateClick, id, title, type, text, date, handleDeleteNote }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteText,setNoteText] = useState('');
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setNoteText(event.target.value);
    }   

    const toggleCheckbox = event => {
        
        setChecked(event.target.checked);
        if(checked===false){
            selected++
        }else if(checked===true){
            selected--
        }
        console.log(checked)
        console.log(selected)
    }

    const progress = selected/0.04;

    
    return (
        <div className={type}>
            <div className="note-header">
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style ={{color: "#FFFF",left: "-10px"}} checked={checked} color="default" value={text} onChange={toggleCheckbox}/>
                <span className="title-header">{checked ? <strike>{title}</strike> : title}</span>
                <span class="material-icons" onClick={() => setIsModalVisible(true)}>edit</span>
                <span class="material-icons" onClick={() => handleDeleteNote(id)}>delete</span>
            </div>
            {isModalVisible ? <Modal onClose={() => setIsModalVisible(false)}>
            <div className="update-container">
                <div className="header-noteupdate">
                <textarea rows="1" cols="10" placeholder={title} className="title-field" disabled></textarea>
                <select className="select-newnote" disabled>
                    <option value="notype">{type}</option>
                </select>
                </div>
                <div className="description-field-update">
                    <textarea className="update-note" rows="8" cols="10" placeholder={text} onChange={handleChange} value={noteText}>
                    </textarea>
                    <div className="note-footer">
                        <button className="cancel" onClick={() => setIsModalVisible(false)}>CANCEL</button>
                        <button className="save" onClick={() => handleUpdateClick(id, noteText)}>UPDATE</button>
                    </div>
                </div>
            </div>
            </Modal> : null}
            <span>{checked ? <strike>{text}</strike> : text}</span>
            <div className="note-footer">
                <small>{checked ? <strike>{date}</strike> : date}</small>
            </div>
        </div>
    )
};

export default Note;