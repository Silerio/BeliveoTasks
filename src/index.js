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


    const [currentList, setCurrentList] = useState(() => {
        if(localStorage.getItem('currentList') == null){
            return { listId: 0, listName: 'All'};
        }else{
            return JSON.parse(localStorage.getItem('currentList'));
        }
    });

    useEffect(() => {
        localStorage.setItem('currentList',JSON.stringify(currentList));
    }, [currentList]);


    const [lists, setLists] = useState(() => {
        if(localStorage.getItem('lists') == null){
            return [currentList];
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

        var date = new Date();
        var creationDate =
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + "-" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

        setTasks([...tasks,
            {
                taskId: taskId,
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskList: currentList.listId,
                taskStatus: 0,
                taskCreationDate: creationDate,
                taskDoneDate: null
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

        setCurrentList({ listId: listId, listName: list.listName});
    }

    const doneTask = (taskId) => {
        var date = new Date();
        var taskDoneDate =
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + "-" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);


        setTasks(
            tasks.map(task => (task.taskId === taskId ? {...task, taskStatus: 1, taskDoneDate: taskDoneDate} : task))
        );
    }

    const changeCurrentList = (listId) => {
        var list = lists.filter(list => list.listId === listId).map((list) => {
            return list;
        });
        setCurrentList(list[0]);
    }

    return(
        <div className='row'>
            <Form addTask={addTask} addList={addList} lists={lists.sort((a, b) => (a.listName > b.listName) ? 1 : -1)} currentList={currentList} changeCurrentList={changeCurrentList}/>
            <List status={0} tasks={tasks} doneTask={doneTask} currentList={currentList}/>
            <List status={1} tasks={tasks} doneTask={doneTask} currentList={currentList}/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('mainContainer'));