import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form.js';
import List from './components/List/List.js';
import './index.css';

const Index = () => {

    const [tasks, setTasks] = useState(() => {
        if(localStorage.getItem('tasks') == null){
            return [];
        }else{
            return JSON.parse(localStorage.getItem('tasks'));
        }
    });

    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {

        var taskId;
        if(tasks.length > 0){
            taskId = tasks[tasks.length-1].taskId + 1;
        }else{
            taskId = 1;
        }

        setTasks([...tasks,
            {
                taskId: taskId,
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskList: null,
                taskStatus: 0
            }
        ]);
    }

    const doneTask = (taskId) => {
        setTasks(
            tasks.map(task => (task.taskId === taskId ? {...task, taskStatus: 1} : task))
        );
    }

    return(
        <div className='row'>
            <Form addTask={addTask}/>
            <List status={0} tasks={tasks} doneTask={doneTask}/>
            <List status={1} tasks={tasks} doneTask={doneTask}/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('mainContainer'));