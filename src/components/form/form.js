import React from 'react';
import './form.css';

function Form(props){
    return(
        <div>
            <ul className="nav nav-tabs">

                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tasks">Tasks</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#lists">Lists</a>
                </li>

            </ul>
            <div className="tab-content">

                <div className="tab-pane fade show active" id="tasks">
                    <div className="formContainer p-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Task Name..."/>
                        </div>
                        <div className="input-group">
                            <textarea className="form-control" placeholder="(Optional) Extra indications for the task..."></textarea>
                        </div>
                        <div class="buttonContainer mt-4">
                            <button type="button" className="btn btn-primary btn-lg">Add Task</button>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="lists">
                    <div className="formContainer p-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="List Name..."/>
                        </div>
                        <div class="buttonContainer  mt-2">
                            <button type="button" className="btn btn-primary btn-lg">Add List</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Form;