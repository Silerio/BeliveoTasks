import React from 'react';
import './list.css';

function List(props){
    /*
        Esta función genera el enlistado de tareas que aparecen en el lado izquierdo
        de la Lista.

        Se recorre el arreglo de tareas y se condiciona cuales tareas se van
        a enlistar, esto de acuerdo a los parametros recibidos en las propiedades.

        Los elementos se generan con algunos datos dínamicos para decidir si se 
        muestran, su color, datos default, etc..

        Se comprueba si existen o no tareas enlistadas para decidir que mostrar.
    */
    const generateTaskNames = (props) => {
        var taskNames = props.tasks.filter(task => (task.taskStatus === props.status && (task.taskList === props.currentList.listId || props.currentList.listId === 0))).map((task, i) => {
            return(
                <a className={"list-group-item list-group-item-action "+(i === 0 ? 'active' : '')+(props.status === 0 ? ' taskToDo' : ' taskDone')} data-toggle="list" href={'#task'+i+props.status} key={i}>
                    {(task.taskName !== '' ? task.taskName : '*No Name Task')}
                </a>
            )
        });

        return (taskNames.length > 0 ? taskNames : <span className="listEmptyText">Without Tasks</span>);
    }





    /*
        Esta función genera las descripciones que aparecen en el lado derecho
        de la Lista.

        Se hace el mismo proceso que la funcion anterior.

        Se generan elementos con información dinámica.

        Se comprueba si existen o no tareas enlistadas para decidir que mostrar.
    */
    const generateTaskDescriptions = (props) => {   
        var taskDescripctions =  props.tasks.filter(task => (task.taskStatus === props.status && (task.taskList === props.currentList.listId || props.currentList.listId === 0))).map((task, i) => {
            return(
                <div className={"tab-pane fade "+(i === 0 ? 'show active' : '')} id={'task'+i+props.status} key={i}>
                    <h4>{task.taskName}</h4>
                    {(task.taskDescription !== '' ? task.taskDescription : '*No Description')}
                    <span className="taskDate">
                        Creation: {task.taskCreationDate}
                        <br/>
                        {(task.taskStatus === 1) ? 'Done Task: '+task.taskDoneDate: ''}
                    </span>
                    <div className="buttonContainer mt-4">
                        {(task.taskStatus === 0 ? 
                            <button type="button" className="btn btn-success btn-small" onClick={() => {props.doneTask(task.taskId)}}>
                                Done
                            </button>
                        :'')}
                    </div>
                </div>
            )
        });

        return (taskDescripctions.length > 0 ? taskDescripctions : <span>This list is empty!</span>);
    }




    /*
        Retorno del componente List, se retorna el renderizado de la Lista.
    */
    return(
        <div className="col-12 mt-2">
            <div className="row mx-0 mt-2 px-3 py-4 listContainer">
                <div className="col-5 overflow-auto">
                    <div className="list-group">
                        <span className="listTasksHeader">{props.currentList.listName} - {(props.status === 0) ? 'To Do' : 'Done'}</span>
                        {generateTaskNames(props)}
                    </div>
                </div>
                <div className="col-7">
                    <div className={"tab-content descriptionContainer "+ (props.status === 0 ? ' taskToDo' : ' taskDone')}>
                        {generateTaskDescriptions(props)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;