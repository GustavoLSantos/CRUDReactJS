import React from "react";

const Search = ({ handleSearchNote }) => {
    return(
        <div className="search">
            <span class="material-icons">search</span>
            <input onChange={(event)=>handleSearchNote(event.target.value)} type="text" placeholder="Search notes..."/>
        </div>
    )
}

export default Search;