import React, { Component } from 'react';
import { toast } from 'react-toastify';
import t from './../../utils/notify.js'
import httpClient from './../../utils/httpClient.js'
import axios from 'axios';
import { Button } from '../common/Button/button.component.js';

const BASEURL = process.env.REACT_APP_BASE_URL;
const defaultForm = {
    Name: '',
    Email: '',
    temp: '',
    perm: '',
    Username: '',
    Password: '',
    confirmPassword: '',
    Gender: '',
    DoB: '',
    phoneNumber: ''
}
export class Register extends Component {

    constructor() {
        super();
        // this.state = {didUpdate: ''};
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false
        }
        console.log('constructor first');
    }

    // componentDidMount() {
    //     //to fetch data at begininng like live scores etc
    //     console.log('after everything is loaded properly');
    //     // this.setState({
    //     //     didUpdate : 'asdad'
    //     // })
    //     // let i = 1;
    //     // this.interval = setInterval(() => {
    //     //     this.setState({
    //     //         didUpdate: i
    //     //     })
    //     //     i++;
    //     // }, 1000)

    // }

    // componentDidUpdate(prevProps, prevState) {
    //     //after props or state has been updated
    //     console.log('Once component is updated');
    //     console.log('previous state >>', prevState);
    //     console.log('recent state >>', this.state)
    // }

    // componentWillUnmount() {
    //     console.log("after event getting destroyed");
    //     // clearInterval(this.interval);
    // }
    handleSubmit = (e) => {
        // t.successs('warning ok')
        e.preventDefault();


        setTimeout(() => {
            this.setState({
                isSubmitting: false
            })
            // this.props.history.push({
            //     pathname: '/',
            //     state: {
            //         nice: 'asfsd'
            //     }
            // });
        }, 1000);

        this.setState({
            isSubmitting: true
        })

        // console.log('this state >>', this.state);

        httpClient.POST(`admin/register`, this.state.data)
            .then(response => {
                console.log('Http response >>', response)
                this.props.history.push('/login');
                t.successs('success');
            })
            .catch(err => {
                console.log('Http err >>', err)
                t.handleError(err);
                this.setState({
                    isSubmitting: true
                })
            })


        // axios.post(`${BASEURL}/admin/register`, this.state.data, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     params: {},
        //     responseType: 'json'
        // })
        //     .then(response => {
        //         console.log('Http response >>', response)
        //         this.props.history.push('/login');
        //         t.successs('success');
        //     })
        //     .catch(err => {
        //         console.log('Http err >>', err)
        //         t.handleError(err);
        //         this.setState({
        //             isSubmitting: true
        //         })

        //     })
    }

    handleChange = (e) => {
        // t.errorr('failed');
        const { name, value } = e.target;
        // this.setState({
        //     data: {
        //         [name] : value
        //     }

        // }, () => {
        //     console.log('Value of state >>', this.state);
        // })

        // this.state((prev) => ({
        //     data: {
        //         ...prev.data,
        //         [name]: value
        //     }
        // }), () => {
        //     this.validate(name);
        // })

        this.setState((preState) => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {

            console.log('State >>', this.state);
            this.validate(name);
        })
    }

    validate = (fieldname) => {
        let errMsg;
        switch (fieldname) {
            case 'Username':
                errMsg = this.state.data[fieldname] ?
                    this.state.data[fieldname].length > 6 ? ''
                        : 'Username is weak'

                    : 'required username'
                break;

            case 'Password':
                errMsg = this.state.data['confirmPassword']
                    ? this.state.data['confirmPassword'] === this.state.data[fieldname]
                        ? ''
                        : 'Unmatched'
                    : this.state.data[fieldname]
                        ? this.state.data[fieldname].length > 6
                            ? ''
                            : 'Password is weak'
                        : 'required password';
                break;

            case 'confirmPassword':
                errMsg = this.state.data['password']
                    ? this.state.data['password'] === this.state.data[fieldname]
                        ? ''
                        : 'Unmatch Password'
                    : this.state.data[fieldname]
                        ? this.state.data[fieldname].length > 6
                            ? ''
                            : 'Password is weak'
                        : 'required password';
                break;


            case 'Email':
                errMsg = this.state.data[fieldname]
                    ? this.state.data[fieldname].includes('@') && this.state.data[fieldname].includes('.com')
                        ? ''
                        : 'incorrect email'
                    : 'required email'
                break;

            default:
                break;
        }


        this.setState((pre) => ({
            error: {
                ...pre.error,//lkk
                [fieldname]: errMsg

            }
        }), () => {
            const errors = Object.values(this.state.error).filter(err => err);
            console.log('errors >>', errors);
            this.setState({
                isValidForm: errors.length === 0
            })
            console.log('Check error >>', errors.length);
            console.log('isValidForm >>', this.state.isValidForm);
        })

    }


    render() {
        // let btn = this.state.isSubmitting
        //     ? <button disabled type="submit" className="btn btn-primary m-t-10">submiting....</button>
        //     : <button disabled={!this.state.isValidForm} type="submit" className="btn btn-primary m-t-10">submit</button>
        // console.log('ui loading now');
        console.log('isValidForm >>', this.state.isValidForm)
        return (

            <div>
                <h2>Register</h2>
                {/* <p>Current lesson : {this.state.didUpdate}</p> */}
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input className="form-control" type="text" name="Name" placeholder="Name" onChange={this.handleChange}></input>
                    <p>{this.state.error.Name}</p>
                    <label>Email</label>
                    <input className="form-control" type="text" name="Email" placeholder="Email" onChange={this.handleChange}></input>
                    <p>{this.state.error.Email}</p>
                    <label>Username</label>
                    <input className="form-control" type="text" name="Username" placeholder="Username" onChange={this.handleChange}></input>
                    <p>{this.state.error.Username}</p>
                    <label>Password</label>
                    <input className="form-control" type="password" name="Password" placeholder="Password" onChange={this.handleChange}></input>
                    <p>{this.state.error.Password}</p>
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>
                    <p>{this.state.error.confirmPassword}</p>
                    <label>Phone Number</label>
                    <input className="form-control" type="number" name="phoneNumber" onChange={this.handleChange}></input>
                    <p>{this.state.error.phoneNumber}</p>
                    <label>D.O.B</label>
                    <input className="form-control" type="date" name="DoB" onChange={this.handleChange}></input>
                    <p>{this.state.error.DoB}</p>
                    <label>Gender</label>
                    <input className="form-control" type="text" name="Gender" onChange={this.handleChange}></input>
                    <p>{this.state.error.Gender}</p>
                    <label>Temporary Address</label>
                    <input className="form-control" type="text" placeholder="Temporary Address" name="temp" onChange={this.handleChange}></input>
                    <p>{this.state.error.temp}</p>
                    <label>Permanent Address</label>
                    <input className="form-control" type="text" placeholder="Permanent Address" name="perm" onChange={this.handleChange}></input>
                    <p className="err" >{this.state.error.perm}</p>

                    <Button
                        isSubmitting={this.state.isSubmitting}

                        isValidForm={this.state.isValidForm}
                    ></Button>

                </form>
            </div>

        )
    }

}