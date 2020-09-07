import React from 'react';
import './list.css';

function List(props){

    const generateTaskNames = (props) => {
        var taskNames = props.tasks.filter(task => task.taskStatus === props.status).map((task, i) => {
            return(
                <a className={"list-group-item list-group-item-action "+(i === 0 ? 'active' : '')} data-toggle="list" href={'#task'+i+props.status} key={i}>
                    {task.taskName}
                </a>
            )
        });

        return (taskNames.length > 0 ? taskNames : <span className="listEmptyText">Without Tasks</span>);
    }

    const generateTaskDescriptions = (props) => {   
        var taskDescripctions =  props.tasks.filter(task => task.taskStatus === props.status).map((task, i) => {
            return(
                <div className={"tab-pane fade "+(i === 0 ? 'show active' : '')} id={'task'+i+props.status} key={i}>
                    {task.taskDescription}
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

    return(
        <div className="col-12 mt-2">
            <div className="row mx-0 mt-2 px-3 py-4 listContainer">
                <div className="col-5 overflow-auto">
                    <div className="list-group">
                        <span className="listTasksHeader">Tasks</span>
                        {generateTaskNames(props)}
                    </div>
                </div>
                <div className="col-7">
                    <div className="tab-content descriptionContainer">
                        {generateTaskDescriptions(props)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;