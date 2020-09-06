import React from 'react';
import './listTasks.css';

function ListTasks(props){
    return(
        <div className="col-12 my-2">
            <div className="row mx-0 my-4 px-3 py-4 listContainer">
                <div class="col-12 mb-4">
                    <h3 class="listTitle">
                        <span class="badge badge-primary">To Do</span> List
                    </h3>
                </div>
                <div className="col-5 overflow-auto">
                    <div className="list-group">
                        <a className="list-group-item list-group-item-action active" data-toggle="list" href="#task1">task1</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list" href="#task2">task2</a>
                    </div>
                </div>
                <div className="col-7">
                    <div className="tab-content descriptionContainer">
                        <div className="tab-pane fade show active" id="task1">
                            Aqui se muestra un texto de prueba task1
                        </div>
                        <div className="tab-pane fade" id="task2">
                            seseed task2 v Aqui se muestra un texto de prueba task1 Aqui se muestra un texto de prueba task1Aqui se muestra un texto de prueba task1 Aqui se muestra un texto de prueba task1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListTasks;