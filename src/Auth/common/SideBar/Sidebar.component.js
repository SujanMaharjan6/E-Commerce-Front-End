import React from 'react';
import { Link } from 'react-router-dom'
import './../SideBar/Sidebar.component.css'

export const Sidebar = () => {
    return (
        <div className="sidenav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/addItem">Add Items</Link>
            <Link to="/showItem">View Items</Link>
            <Link to="/search">Search</Link>
            <Link to="/chat">Chat</Link>
            <div className="main">
                ...
</div>
        </div>
    )
}