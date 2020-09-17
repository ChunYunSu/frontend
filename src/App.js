import React, { useState, useEffect } from 'react';
import './App.css';
import CreateTask from './CreateTask';

function Task({ task, index, completeTask, removeTask }) {
  return (
      <div
          className="task"
          
      >
         <div style={{ textDecoration: task.completed ? "line-through" : ""}}> {task.title} </div>
          <div className="taskState">
              <div className={(task.completed ? "taskHide" : "taskActive")}>
                <button onClick={() => removeTask(index)}>Delete</button>
                <button onClick={() => completeTask(index)}>Mark as done</button>
              </div>
              <div className={"doneTime " + (task.completed ? "taskActive" : "taskHide")}>
              完成時間 :  <span > {task.completedDate }</span>
              </div>
          </div>
          
      </div>
  );
}



function App() {
  const [tasks, setTasks] = useState([
    { "completed": false,
      "id": 1600273412560,
      "title": "Learning React"}
   
    ]);

const [tasksRemaining, setTasksRemaining] = useState("todo");
const [taskItems, setTaskItems] = useState(tasks);
const [checked, setChecked] = useState(false);
const [selected, setSelected] = useState("todo");

const handleFilterChange =(e, filterType) =>{
  setTasksRemaining(e.target.value)
 
}

 useEffect(() =>{
   
  let filteredResult = taskItems;
  
   switch(tasksRemaining){
     case "all":
       filteredResult =taskItems;
       setChecked(false);
       break;
      case "todo":
        filteredResult = taskItems.filter(task => !task.completed);
        setChecked(false);
        break;
      case "done":
        filteredResult = taskItems.filter(task => task.completed=== true);
        setChecked(true);
        break;
        default:
        break;
   }
  
   setTaskItems(filteredResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[tasksRemaining]) 

 setSelected(tasksRemaining);
  const addTask = title => {
    const newTasks = [...taskItems, { title, completed: false, id: Date.now() }];
    
    setTaskItems(newTasks);
    setTasks(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...taskItems];
    newTasks[index].completed = true;    
    let dateTime = new Date().toLocaleString();
    newTasks[index].completedDate = dateTime;
    
    //let filteredResult = filterObject(newTasks);
    //setTaskItems(filteredResult);
    setTasks(newTasks);

  };

  const removeTask = index => {
    const newTasks = [...taskItems];
    newTasks.splice(index, 1);
    setTaskItems(newTasks);
    setTasks(newTasks);
  };
  
  

  const options =[{'value':'todo','text':'Todo'},{'value':'done','text':'Done'},{'value':'all','text':'All'}];
return (
  
    <div className="todo-container">
       <div className="create-task" >
            <CreateTask addTask={addTask} />
        </div>
        
        <div className="tasks">
         <div className="controlBox">
              <div className="count">{taskItems.length} item(s)</div>
              <div className="filter">
                  <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")}>
                  {options.map(function(name, index){
                        return <option value={name.value} selected={selected === name.value}>{name.text}</option>;
                    })}
 
                    </select>
                  <label><input type="checkbox" value="done" onChange={(e) => handleFilterChange(e, "category")}  checked={checked} />Show Done Items</label>
              </div>
           </div> 
         
            {taskItems.map((task, index) => (
                <Task
                task={task}
                index={index}
                completeTask={completeTask}
                removeTask={removeTask}
                key={task.id}
                />
            ))}
        </div>
       
    </div>
);
}

export default App;
