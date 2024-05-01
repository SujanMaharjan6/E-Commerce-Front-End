import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Forgot } from '../forgotPassword/forgotPassword.component';
import { Login } from '../Login/Login.component';
import { ResetPassword } from '../resetPassword/ResetPassword.component';
import { AddItem } from './common/Items/AddItems/AddItem.component';
import { Edititem } from './common/Items/EditItems/Edititem.component';
import { ViewItem } from './common/Items/ViewItem/viewItem.component';

import { NavBar } from './common/NavBar/NavBar.component';
import { Search } from './common/search/search.component';
import { Sidebar } from './common/SideBar/Sidebar.component';
import { Register } from './register/register.component';
import { Chat } from './User/Chat/Chat.component';

// const Dashboard = () => {
//     return(
//         <h2>This is dashboard page</h2>
//     )
// }

const Logout = () => {
    return(
        <h2>Logout Page</h2>
    )
}

const Dashboard = (props) => {
    console.log('props', props);
    return (
        <div>
        <h2>Dashboard</h2>
        <img src="../app2.jpeg" ></img>
        </div>
    ) 
    
}
const Notfound = (props) => {
    return(
        <h4>Not Found</h4>
    )
}

const ProtectedRoute = ({component: Component, ...rest}) => {
//    console.log('rest', {...rest})
   return (
    <Route {...rest} render = {(props) => (
            localStorage.getItem('token')?
            <div>
                <NavBar isLoggedin = {true}/>
                <Sidebar/>
           
            <div className= "main">
            <Component {...props} ></Component>
            </div>

            </div>
            : <Redirect to='/nepal'/>


    )}></Route>
    )
}

const PublicRoute = ({component: Component, ...rest}) => {
    return (
<Route {...rest} render = {(props) => (
    <div>
        <NavBar isLoggedin = {localStorage.getItem('rememberMe')? true: false} ></NavBar>
        {/* <Sidebar/> */}

        <div className= "main">
            <Component {...props} ></Component>

        </div>
    </div>
)}>


</Route>
    )
}



export const Routery = (props) => {

    return (
        <BrowserRouter>
            {/* <NavBar isLoggedin={true} />
            <Sidebar/> */}
            <Switch>
            <ProtectedRoute exact path="/" component={Login} ></ProtectedRoute>
            <ProtectedRoute exact path="/register" component={Register} ></ProtectedRoute>
            <ProtectedRoute exact path="/login" component={Login} ></ProtectedRoute>
            <ProtectedRoute exact path="/addItem" component={AddItem} ></ProtectedRoute>
            <ProtectedRoute exact path="/showItem" component={ViewItem} ></ProtectedRoute>
            <ProtectedRoute exact path="/dashboard" component={Edititem} ></ProtectedRoute>
            <ProtectedRoute exact path="/edit_item/:id" component={Edititem} ></ProtectedRoute>
            <ProtectedRoute exact path="/chat" component={Chat} ></ProtectedRoute>
            <ProtectedRoute exact path="/search" component={Search} ></ProtectedRoute>
            <ProtectedRoute exact path="/forgotPassword" component={Forgot} ></ProtectedRoute>
            <PublicRoute exact path="/logout" component={Logout} ></PublicRoute>
            <PublicRoute exact path="/reset/:id" component={ResetPassword} ></PublicRoute>
            {/* <PublicRoute exact path="/dashboard/:nm" component={Dashboard} ></PublicRoute> */}
            <PublicRoute exact component= {Notfound}></PublicRoute>
            </Switch>
        </BrowserRouter>
    )

}