import React from 'react';
import { useState } from "react";
import Modal from "./Modal";          
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

export var selected = 0;

const Note = ({ handleSelectedBoxes, handleUpdateClick, id, title, type, text, date, handleDeleteNote }) => {

    //Defining the states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteText,setNoteText] = useState('');
    const [checked, setChecked] = useState(false);
    //Setting the note text state when the textarea is changed
    const handleChange = (event) => {
        setNoteText(event.target.value);
    }   
    //Raising the counter when the boxes are checked
    const toggleCheckbox = event => {
        
        setChecked(event.target.checked);
        if(checked===false){
            selected++
        }else if(checked===true){
            selected--
        }
        handleSelectedBoxes(selected)
    }

    //Styled-components for the ones that appear a lot on the hole code
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
                <SelectType className="select-newnote" disabled>
                    <option value="notype">{type}</option>
                </SelectType>
                </div>
                <div className="description-field-update">
                    <textarea className="update-note" rows="8" cols="10" placeholder={text} onChange={handleChange} value={noteText}>
                    </textarea>
                    <div className="note-footer">
                        <FormButton onClick={() => setIsModalVisible(false)}>CANCEL</FormButton>
                        <FormButton onClick={() => handleUpdateClick(id, noteText)}>UPDATE</FormButton>
                    </div>
                </div>
            </div>
            </Modal> : null}
            <span>{checked ? <strike>{text}</strike> : text}</span>
            <div className="note-footer-date">
                <small>{checked ? <strike>{date}</strike> : date}</small>
            </div>
        </div>
    )
};

export default Note;