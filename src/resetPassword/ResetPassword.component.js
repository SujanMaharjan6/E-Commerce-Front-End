import React, { Component } from 'react'
import { Button } from '../Auth/common/Button/button.component';
import httpVerb from '../utils/httpClient';
import t from '../utils/notify';

export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                password: '',
            },
            err: {
                password: ''
            },

            isValidForm: false,
            isSubmitting: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('asd', this.state.data)
        const ItemId = this.props.match.params['id'];
        httpVerb.POST(`/admin/reset/${ItemId}`, this.state.data)
            .then(response => {
                t.successs('Your Password has been reset');
                console.log(response);
                this.props.history.push('/login');
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
        console.log(';here>>', this.state.data)
        var errmsg;
        if (name === 'password') {
            // console.log(';here')
            errmsg = this.state.data[name] ?
                ''
                : 'Required Email'

            this.setState({
                err: {
                    password: errmsg
                }


            }, () => {
                const array = Object.values(this.state.err).filter(data => data);
                console.log('sadasd',array);
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
                    <label>Enter Your New Password</label>
                    <br></br>
                    <input type='text' placeholder='Password' name='password' onChange={this.handleChange}></input>
                    <p>{this.state.err.password}</p>

                    <label>Enter Your New Password Again</label>
                    <br></br>
                    <input type='text' placeholder='Password' name='confirm' onChange={this.handleChange}></input>
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
