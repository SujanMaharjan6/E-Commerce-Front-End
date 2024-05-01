import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import t from './../utils/notify.js'
import { Link } from 'react-router-dom';
import { Button } from '../Auth/common/Button/button.component'
// import t from './../../utils/notify.js';
import axios from 'axios';
import httpClient from '../utils/httpClient.js';

const BaseURL = process.env.REACT_APP_BASE_URL;
const default1 = {
    username: '',
    password: '',
    usernameErr: '',
    passwordErr: '',
}
export class Login extends Component {





    constructor() {
        super();
        this.state = {
            data: {
                ...default1
            },
            err: {
                ...default1
            },
            remember_me: false,
            isSubmitting: false,
            isValidForm: true

        };
    }

    componentDidMount() {
        console.log('props >>', this.props.history)
        // t.successs('good')
        // if (localStorage.getItem('rememberMe') === 'true') {
        //     this.props.history.push('/dashboard/asd')
        // }
    }
    handleChange = (e) => {
        // t.warns('new')
        console.log('target pasda >>', e.target);
        const { type, name, value, checked } = e.target;
        // console.log('zvzxcz', name +  value);
        // this.setState({

        //     [name]: value
        // }, () =>{
        //     this.validationForm(name);
        // })

        if (type === 'checkbox') {
            console.log('check', checked + ' ' + value);
            this.setState({
                remember_me: checked
            })
            localStorage.setItem('rememberMe', checked);
            return;
        }


        this.setState((prev) => ({
            data: {
                ...prev.data,
                [name]: value

            }
        }), () => {
            this.validationForm(name);
        })

        console.log('ta >>', this.state);
        console.log('this is field name >>', this.state.data[name]);
    }

    validationForm = (fieldName) => {
        let err = this.state[fieldName] ?
            ''
            : 'required field'
        let errField = `${fieldName}Err`

        // this.setState({
        //     [errField] : err
        // });

        this.setState((prev) => ({
            err: {
                ...prev.err,
                [fieldName]: err

            }
        }), () => {
            const errors = Object.values(this.state.err).filter((data) => data);
            // this.setState({
            //     isValidForm: errors.length === 0
            // })
        })

        // console.log('this is field name >>', this.state[fieldName]);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('targadadadet pasda >>', this.state);
        // this.props.history.push('/dashboard/nepal');


        httpClient.POST(`/admin/login`, this.state.data)
            .then(response => {
                console.log('This is response >>', response);
                t.successs("Successfull login");
                localStorage.setItem('remember_me', this.state.remember_me);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                this.props.history.push('/dashboard/nepal');
            })
            .catch(err => {
                t.handleError(err);
            })
        // axios.post(`${BaseURL}/admin/login`, this.state.data, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     responseType: 'json'
        // })
        //     .then(response => {
        //         console.log('This is response >>', response);
        //         t.successs("Successfull login");
        //         localStorage.setItem('remember_me', this.state.remember_me);
        //         localStorage.setItem('token', response.data.token);
        //         localStorage.setItem('user', JSON.stringify(response.data.user));
        //     })
        //     .catch(err => {
        //         t.handleError(err);
        //     })
    }


    render() {
console.log('isvalid', this.state.isValidForm)
        return (
            <div className="container">
                <br />
                <p>Welcome to React</p>
                <form className="form-group" onSubmit={this.handleSubmit} >
                    <label htmlFor="Username" >Username</label>
                    <input className="form-control" type="text" placeholder="Username" name="Username" id="Username" onChange={this.handleChange} ></input>
                    <p className="err" >{this.state.usernameErr}</p>
                    <label htmlFor="Password" >Username</label>
                    <input className="form-control" type="password" placeholder="Password" name="Password" id="Password" onChange={this.handleChange} ></input>
                    <p className="err" >{this.state.passwordErr}</p>
                    <br />
                    <input type="checkbox" name="rememberMe" onChange={this.handleChange}></input>
                    <label>Remember Me</label>
                    <br />
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidForm}
                        enabledLabel='Login'
                        disabledLabel='Login ....'
                    ></Button>
                </form>
                <br />
                <p style={{ float: "left" }} >Forgot Password</p>
                <p style={{ float: "right" }}>Click <Link to="/forgotPassword">here</Link></p>


            </div>
        )

    }


}