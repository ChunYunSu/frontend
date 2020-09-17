import React, { useState, useEffect } from 'react';

import CreateTask from './CreateTask';


function Task({ task, index, completeTask, removeTask}) {
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


function TodoItem() {
  const [tasks, setTasks] = useState([
    { "completed": false,
      "id": 1600273412560,
      "title": "Learning React"}
   
    ]);
    const options =[{'value':'todo','text':'Todo'},{'value':'done','text':'Done'},{'value':'all','text':'All'}];
    const [taskItems, setTaskItems] = useState(tasks);
    const [tasksRemaining, setTasksRemaining] = useState("todo");
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState("todo");

    const addTask = title => {
      const newTasks = [...taskItems, { title, completed: false, id: Date.now() }];
      let filteredResult = filterObject(newTasks);
      setTaskItems(newTasks);
      setTasks(newTasks);
    };
    const completeTask = index => {
      const newTasks = [...taskItems];
      newTasks[index].completed = true;    
      let dateTime = new Date().toLocaleString();
      newTasks[index].completedDate = dateTime;
      
      let filteredResult = filterObject(newTasks);
      console.log(filteredResult);
      setTaskItems(filteredResult);
      setTasks(newTasks);
  
    };
  
    

    const removeTask = index => {
      const newTasks = [...taskItems];
      newTasks.splice(index, 1);
      setTaskItems(newTasks);
      setTasks(newTasks);
    };

    const handleFilterChange =(e, filterType) =>{
      setTasksRemaining(e.target.value)
    }
    function filterObject(newTasks){
      let filteredResult = newTasks;
      switch(tasksRemaining){
        case "all":
          filteredResult =newTasks;
          break;
         case "todo":
           filteredResult = newTasks.filter(task => !task.completed);
           break;
         case "done":
           filteredResult = newTasks.filter(task => task.completed=== true);
           break;
      }
      return filteredResult;
    }
    useEffect(() =>{
   
      let filteredResult = taskItems;
      
       switch(tasksRemaining){
         case "all":
           filteredResult =tasks;
           setChecked(false);
           break;
          case "todo":
            filteredResult = tasks.filter(task => !task.completed);
            setChecked(false);
            break;
          case "done":
            filteredResult = tasks.filter(task => task.completed=== true);
            setChecked(true);
            break;
            default:
            break;
       }
      
       setTaskItems(filteredResult);
       setSelected(tasksRemaining);
     },[tasksRemaining]) 

  return(
    <div className="todo-container">
    <div className="create-task" >
         <CreateTask addTask={addTask} />
     </div>
      
     <div className="tasks">
         <div className="controlBox">
              <div className="count">{taskItems.length} item(s)</div>
              <div className="filter">
                  <select name="category" id="category" onChange={(e) => handleFilterChange(e, "category")} value={selected}>
                  {options.map(function(name, index){
                        return <option value={name.value} key={index} >{name.text}</option>;
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

export default TodoItem;