import React from 'react';
import './NavBar.component.css';
import {Link, withRouter} from 'react-router-dom';



 const NavBarItem = (props) => {
    // const logout = (data) => {
    //     // localStorage.clear();
    //     localStorage.setItem('rememberMe', false);
    //     props.history.push('/login')
    //     }
    let menu = props.isLoggedin
        ?
        <ul className="NavList" >
            <li className="NavItem"  > <Link to="/login" >Home</Link></li>
            <li className="NavItem" > <Link to="/register" >Register</Link></li>
            <li className="NavItem" > <Link to="/dashboard" >Dashboard</Link></li>
            <li className="NavItem" > <Link to="/logout" >Logout</Link></li>
            {/* <li className="NavItem" > <button onClick= {logout} className= "btn btn-sm btn-warning" >Logout</button></li> */}
        </ul>

        :
        <ul className="NavList" >
            <li className="NavItem" >Home</li>
            {/* <li className="NavItem" >Contacts</li> */}
            <li className="NavItem" ><Link to="/login" >About</Link></li>
            {/* <li className="NavItem" >Logout</li> */}
        </ul>

    return (
        <div className="NavBar" >
            {menu}
        </div>
    )
}

export const NavBar = withRouter(NavBarItem);