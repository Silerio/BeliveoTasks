import React from 'react';
import './form.css';

function Form(props){
    /*
        Esta función manda a llamar a la función del componente Index para agregar
        una nueva tarea.

        Se declaran las variables con los valores de los campos de texto.

        Se llama a la función para agrear una nueva tarea pasando como parámetros
        los datos anteriores.

        Se limpian los campos de texto.
    */
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





    /*
        Esta función agrega una nueva sublista y el proceso es
        igual que al anterior.

        Al final se manda hacer click al botón del modal para cerrarlo
        y limpiar su input.
    */
    const addNewList = () => {
        var listName = document.getElementById('listName').value;

        props.addList({
            listName: listName
        });

        document.getElementById('closeButtonModal').click();
        document.getElementById('listName').value = '';
    }





    /*
        Esta función genera la lista de sublistas en el
        botón multifuncional.

        Se recorre el arreglo de sublistas y se generan los
        elementos con un evento onClick que al ejecutarse
        llamará a la función para cambiar el "currentList".
    */
    const generateLists = (props) => {
        return props.lists.map((list, i) => {
            return(
                <a className="dropdown-item" href={'#'+list.listName} key={i} onClick={() => {props.changeCurrentList(list.listId)}}>
                    {list.listName}
                </a>
            )
        });
    }




    /*
        Retorno del componente Form, se retorna el renderizado del formulario.
    */
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
                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    List in: <b>{props.currentList.listName}</b>
                                </button>
                                <div className="dropdown-menu">
                                    {generateLists(props)}
                                    <div role="separator" className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#Nuevo" data-toggle="modal" data-target="#modal">Add List</a>
                                    <div role="separator" className="dropdown-divider"></div>
                                    <a className="dropdown-item active" href="#Nuevo" onClick={addNewTask}>Add Task</a>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <textarea className="form-control" placeholder="(Optional) More description for the task..." id="taskDescription"></textarea>
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