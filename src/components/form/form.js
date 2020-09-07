import React from 'react';
import './form.css';

function Form(props){

    const addNewTask = () => {
        var taskName = document.getElementById('taskName').value;
        var taskDescription = document.getElementById('taskDescription').value;

        props.addTask({
            taskName: taskName,
            taskDescription: taskDescription
        });

        document.getElementById('taskName').value = '';
        document.getElementById('taskDescription').value = '';
    }

    const addNewList = () => {
        var listName = document.getElementById('listName').value;

        props.addList({
            listName: listName
        });

        document.getElementById('closeButtonModal').click();
        document.getElementById('listName').value = '';
    }

    const generateLists = (props) => {
        return props.lists.map((list, i) => {
            return(
                <a className="dropdown-item" href={'#'+list.listName} key={i}>{list.listName}</a>
            )
        });
    }

    return(
        <div  className="col-12 my-2">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tasks">Tasks</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="tasks">
                    <div className="formContainer p-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Task Name..." id="taskName"/>
                            <div className="input-group-append">
                                <button className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select List</button>
                                <div className="dropdown-menu">
                                    {generateLists(props)}
                                    <div role="separator" className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#Nuevo" data-toggle="modal" data-target="#modal">Add List</a>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <textarea className="form-control" placeholder="(Optional) More description for the task..." id="taskDescription"></textarea>
                        </div>
                        <div className="buttonContainer mt-4">
                            <button type="button" className="btn btn-primary btn-small" onClick={addNewTask}>Add Task</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="col-form-label">New List:</label>
                                <input type="text" className="form-control" id="listName" placeholder="List Name..."/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeButtonModal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={addNewList}>Add List</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;