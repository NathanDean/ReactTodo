// Import React
import React, {useState} from "react";

function Todo(props){

  // Variables

    // Creates variable to track with the user is editing a task, sets setEditing as function to update
    const [isEditing, setEditing] = useState(false);
    
    // Creates newName variable to track name edited by user, sets setNewName as function to update
    const [newName, setNewName] = useState("");

  // Functions

    // Listens for user input to input text component on editing template and updates newName variable to match user input
    function handleChange(event){
      setNewName(event.target.value);
    }

    // Calls editTask function on submit to iterate through tasks array and update name of task with matching id to newName, resets newName to empty string then returns Todo component to view template
    function handleSubmit(event){
      event.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

  // Templates

    // Template for viewing tasks
    const viewTemplate = (

      <div className="stack-small">

        <div className="c-cb">

            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />

            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>

          </div>

          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setEditing(true)}>
              Edit <span className="visually-hidden">{props.name}</span>
            </button>

            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}
            >

              Delete <span className="visually-hidden">{props.name}</span>

            </button>

          </div>

      </div>

    );
    
    // Template for editing tasks
    const editingTemplate = (

      <form className="stack-small" onSubmit={handleSubmit}>

        <div className="form-group">

          <label className="todo-label" htmlFor={props.id}>

            New name for {props.name}

          </label>

          <input id={props.id} className="todo-text" type="text" onChange={handleChange} value={newName} />

        </div>

        <div className="btn-group">

          <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>

            Cancel

            <span className="visually-hidden">renaming {props.name}</span>

          </button>

          <button type="submit" className="btn btn__primary todo-edit">

            Save

            <span className="visually-hidden">new name for {props.name}</span>

          </button>

        </div>

      </form>

    );
  
    // Returns Todo component
    return(
        <li className="todo stack-small">

          {/* If isEditing === true, sets value of component to editingTemplate, else sets value of component to viewTemplate */}
          {isEditing ? editingTemplate : viewTemplate}

        </li>

    );
    
}

// Exports Todo component
export default Todo;