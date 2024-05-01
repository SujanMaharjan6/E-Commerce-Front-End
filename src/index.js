import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom';
import {App} from './Auth/App.component.js';
const i = document.getElementById('app');

const J = (data) => {
    return (
        <div>
        {/* /* <h1>Welcome to computer {data.apple}</h1>
        <p>Old Computer {data.new}</p> */ }

        <App/>
        {/* <Router/> */}
        </div>
    )
}

// ReactDOM.render(<J apple="software" new="old"/>, i);
ReactDOM.render(<J/>, i);