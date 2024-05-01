import React, { Component } from 'react';

import { Login } from '../Login/Login.component.js';
import { NavBar } from './common/NavBar/NavBar.component.js';
import { Register } from './register/register.component.js';
import ReactDOM from 'react-dom';
import { Reg } from './register/pract.js';
import { Router } from 'react-router-dom';
import { Routery } from './App.routing.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './common/SideBar/Sidebar.component.js';
import { store } from '../store.js';
import { Provider } from 'react-redux';

// const mount = () => {
//   ReactDOM.render(<Register/>, document.getElementById('abcd'));
// }

// const unmount = () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById('abcd'));
// }

export const App = () => {
  return (
    <div>
      {/* <p>Welcome !!!</p> */}
      {/* <NavBar isLoggedin = {true}/>
      <NavBar isLoggedin = {false}/> */}
      {/*  {/* <div id='abcd'></div>
       <button className="btn btn-sm btn-success" onClick= {mount} >Mount</button>
       <button className="btn btn-sm btn-danger" onClick= {unmount} >Unmount</button>*/}
      {/* <NavBar isLoggedin = {true}/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Reg/> */}
      <Provider store={store} >
        <Routery />
      </Provider>
      <ToastContainer />
      {/* <Sidebar/> */}
    </div>
  )
}

