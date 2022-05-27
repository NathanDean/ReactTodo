// Import React
import React from "react";

function FilterButton(props){
    
    // Returns FilterButton component
    return(

        // Accesses functions from App.js using the props object
        <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>

            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>

        </button>

    )

}

// Exports FilterButton component
export default FilterButton;