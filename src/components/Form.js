// Import React and useState hook
import React, {useState} from "react";

function Form(props){
    
  // Variables

    // Sets name variable (string displayed in input text component) as empty string, sets setName as function to update
    const [name, setName] = useState("");

  // Functions

    // Listens for user input to input text component and updates name variable to match user input
    function handleChange(event){
      setName(event.target.value);
    }

    // Calls addTask function on submit to create new task with name inputted by user, resets value of input text component to empty string
    function handleSubmit(event){
      event.preventDefault();
      props.addTask(name);
      setName("");
    }

  // Returns Form component
  return(
        
    <form onSubmit={handleSubmit}>

    <h2 className='label-wrapper'>

      <label htmlFor="new-todo-input" className="label__lg">

        What do you need to do?

      </label>

    </h2>

    <input type="text" id="next-todo-input" className="input input__lg" name="text" autoComplete="off" value = {name} onChange={handleChange} />

    <button type="submit" className="btn btn__primary btn__lg">

      Add

    </button>

  </form>
      
  );

}

// Exports Form component
export default Form;