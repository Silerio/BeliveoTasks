import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/form/form.js';
import ListTasks from './components/listTasks/listTasks.js';
import './index.css';

ReactDOM.render(
    <div className='row'>
        <Form/>
        <ListTasks/>
    </div>
, document.getElementById('mainContainer'));