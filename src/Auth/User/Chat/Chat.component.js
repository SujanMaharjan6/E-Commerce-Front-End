import React, { Component } from 'react'
import * as io from 'socket.io-client';

export class Chat extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentDidMount() {
        console.log('socket', this.socket)
        console.log('socket', io)
        this.socket = io(process.env.REACT_APP_SOCKET_URL);
     
        this.funct();
       
    }
    funct(){
        this.socket.on('hello', function(data){
            console.log('got it',  data);
        })
        this.socket.emit('hi', 'hello world chat thing');    
    }

    render() {
        return (
            <>
                <h1>Lets Chat</h1>
            </>
        )
    }
}
