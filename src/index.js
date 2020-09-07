import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form.js';
import List from './components/List/List.js';
import './index.css';


const Index = () => {
    /*
        Declaramos una variable de estado con el Hook State
        llamada "tasks" encargada de guardar un arreglo de tareas.

        Comprobamos si en el almacenamiento local ya existe un item 
        de tareas para retornarselo a "tasks" SI NO existe entonces 
        le retornamos un arreglo vacíos.
    */ 
    const [tasks, setTasks] = useState(() => {
        if(localStorage.getItem('tasks') == null){
            return [];
        }else{
            return JSON.parse(localStorage.getItem('tasks'));
        }
    });
    /*
      Usamos el Hook Effect para que despúes de actualizar "tasks"
      se vaya a guardar en almacenamiento local.
    */
    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);






    /*
        Declaramos una variable de estado llamada "currentList para
        saber que sublista el usuario tiene seleccionada.

        Se hace el mismo proceso que en "tasks" a exepción de que 
        SI NO existe el item en el almacenamiento local se retorna
        una lista predeterminada llamada "All" .
    */
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








    /*
        Declaramos una variable de estado llamada "lists" para
        guardar un arreglo de sublistas.

        Se hace el mismo proceso de comprobación en memoria
        y SI NO existe el item se retorna una arreglo con la sublista 
        predeterminada
    */
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








    /*
        En esta función recibimos como parametro un json
        llamado "task" con los valores a guardar en una 
        nueva tarea.

        Obtenemos un nuevo ID para la tarea sumando +1 al
        último ID del arreglo o si no existe lo iniciamos en 1.

        Creamos un objeto tipo Date y le damos formato para obtener
        la fecha de creación.

        Guardamos una nueva tarea con estos datos en nuestra variable 
        de estado "tasks".
    */
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







    /*
        Esta funcion recibe un json llamado "list" que contiene
        el nombre de la sublista a agregar.

        Si hace el mimso proceso de asignación y guardado.

        Se actualiza la variable de estado "currentList" para
        abrir el filtro de la nueva sublista
    */
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








    /*
        Esta funcion recibe el ID de la tarea a terminar.

        Se crea un objeto Date, se formatea y se obtiene
        la fecha de termino.

        Se recorre el arreglo de tareas hasta encontrar el 
        ID, actualiza su estatus a terminado y guarda su 
        dato de fecha termino.
    */
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






    /*
        Esta funcion recibe el ID de la sublista a cambiar
        para actualizar el "currentList".

        Se recorre el arreglo de sublistas hasta coincidir
        con el ID y ese valor se asigna al "currentList".
    */
    const changeCurrentList = (listId) => {
        var list = lists.filter(list => list.listId === listId).map((list) => {
            return list;
        });
        setCurrentList(list[0]);
    }







    /*
        Retorno del componente Index para iniciar la aplicación.

        Las variables de estado y funciones declaradas anteriormente son
        pasadas como propiedades a los otros componentes.
    */
    return(
        <div className='row'>
            <Form addTask={addTask} addList={addList} lists={lists.sort((a, b) => (a.listName > b.listName) ? 1 : -1)} currentList={currentList} changeCurrentList={changeCurrentList}/>
            <List status={0} tasks={tasks} doneTask={doneTask} currentList={currentList}/>
            <List status={1} tasks={tasks} doneTask={doneTask} currentList={currentList}/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('mainContainer'));