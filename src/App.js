// Import dependencies
import React, {useState} from "react";
import {nanoid} from "nanoid";

// Import components
import Form from "./components/Form.js"
import FilterButton from "./components/FilterButton.js";
import Todo from "./components/Todo.js"

// Sets criteria for filter buttons
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

// Creates array containing names of filters
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  
  // Variables
  
    // Creates empty array for tasks, sets setTasks as function to update
    const [tasks, setTasks] = useState([]);

    // Creates variable to track filter currently in use with "All" as default, sets setFilter as function to update
    const [filter, setFilter] = useState("All");
  
  // Callback props (all passed into components as props when they are called in this file)
  
    // Creates new task with name passed into function, then adds to tasks array
    function addTask(name){
      
      const newTask = {
        id: `todo ${nanoid()}`,
        name: name,
        completed: false
      };
    
      setTasks([...tasks, newTask]);

    }

    // Edits task by iterating through tasks array and updating task name to newName if task id matches that passed into function, returns new array then sets it as value of tasks array
    function editTask(id, newName){
      const editedTasks = tasks.map(task => {
        if (id === task.id) {
          return{...task, name: newName}
        }
        return task;
      });
      setTasks(editedTasks);
    }

    // Deletes task by filtering it out if task id matches that passed into function, returns new array then sets it as value of tasks array
    function deleteTask(id){
      const remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
    }

    // Toggles completed status of task by iterating through array and changing completed status if task id matches that passed into function
    function toggleTaskCompleted(id){
      const updatedTasks = tasks.map(task => {
        if (id === task.id) {
          return{...task, completed: !task.completed}
        }
        return task;
      });
      setTasks(updatedTasks);
    }

  // Components

    // Creates array of FilterButton components from FILTER_NAMES array
    const filterList = FILTER_NAMES.map(name => 
      
      <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
    
    );  
    
    // Creates array of Todo components from tasks array, filters array according to currently selected function from FILTER_MAP array, then iterates over array and creates Todo from each task
    const taskList = tasks.filter(FILTER_MAP[filter]).map(task => 
    
      <Todo id = {task.id} name = {task.name} completed = {task.completed} key = {task.id}  editTask={editTask} deleteTask={deleteTask} toggleTaskCompleted={toggleTaskCompleted} />
    
    );

  // Variables/conditional to update heading according to number of tasks and filter applied
  const taskCount = taskList.length;
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  let taskVerb;

  if(filter === "Active"){
    taskVerb = "active"
  }
  else if (filter === "Completed"){
    taskVerb = "completed"
  }
  else {
    taskVerb = "remaining"
  }

  const heading = `${taskCount} ${taskNoun} ${taskVerb}`;

  // Returns App component
  return (
    <div className="todoapp stack-large">

      <h1>Todo</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">

        {filterList}

      </div>

      <h2 id="list-heading">{heading}</h2>

      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">

        {taskList}

      </ul>

    </div>
  );
}

// Exports app component
export default App;