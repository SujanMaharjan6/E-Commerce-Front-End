import React, { Component } from 'react'
import { Button } from '../Auth/common/Button/button.component';
import httpVerb from '../utils/httpClient';
import t from '../utils/notify';

export class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                email: '',
            },
            err: {
                email: ''
            },

            isValidForm: false,
            isSubmitting: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('asd', this.state.data)
        httpVerb.POST(`/admin/forgot`, this.state.data)
            .then(response => {
                t.successs('Check Your Email to reset your password');
                console.log(response);

                // this.props.history.push(`/reset/${response.data._id}`);
            })
            .catch(error => {
                t.handleError(error);

            })
    }

    handleChange = (e) => {
        let { value, name } = e.target;
        this.setState({
            data: {
                [name]: value
            }


        }, () => {
            // console.log(';here>>',this.state.data)
            this.validate(name);
        })
        console.log(';hesdare', this.state.data)
    }

    validate = (name) => {
        // console.log(';here>>', this.state.data)
        var errmsg;
        if (name === 'email') {
            console.log(';here')
            errmsg = this.state.data[name] ?
                ''
                : 'Required Email'

            this.setState({
                err: {
                    email: errmsg
                }


            }, () => {
                const array = Object.values(this.state.err).filter(data => data);
                this.setState({
                    isValidForm: array.length === 0
                })

            })
        }
    }

    render() {
        return (
            <>
                <br></br>
                <h3>Password reset section</h3>

                <form className='form-group' onSubmit={this.handleSubmit}>
                    <label>Enter Your Email</label>
                    <br></br>
                    <input type='text' placeholder='Your Email goes here' name='email' onChange={this.handleChange}></input>
                    <p>{this.state.err.email}</p>
                    <br />
                    <br />
                    {/* <button className='btn-sm btn-info' >Submit</button> */}
                    <Button
                        isValidForm={this.state.isValidForm}
                        isSubmitting={this.state.isSubmitting}

                    ></Button>
                </form>
            </>
        )
    }
}
