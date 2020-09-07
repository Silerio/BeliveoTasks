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


    const [lists, setLists] = useState(() => {
        if(localStorage.getItem('lists') == null){
            return [{ listId: 0, listName: 'Todos'}];
        }else{
            return JSON.parse(localStorage.getItem('lists'));
        }
    });

    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(lists));
    }, [lists]);

    

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

    const addList = (list) => {

        var listId;
        if(lists.length > 0){
            listId = lists[lists.length-1].listId + 1;
        }else{
            listId = 1;
        }

        setLists([...lists,
            {
                listId: listId,
                listName: list.listName
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
            <Form addTask={addTask} addList={addList} lists={lists}/>
            <List status={0} tasks={tasks} doneTask={doneTask}/>
            <List status={1} tasks={tasks} doneTask={doneTask}/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('mainContainer'));