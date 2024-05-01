import React, { Component } from 'react';


const defaultF = {
    name: '',
    email: '',
    temporaryAddress: '',
    permanentAddress: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    phoneNumber: ''
}

export class Reg extends Component {

    constructor() {
        super();
        this.state = {
            data: {
                ...defaultF
            },
            error: {
                ...defaultF
            },
            isSubmitting: false,
            isValid: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        setTimeout(() => {
            this.setState({
                isSubmitting: false
            })
        }, 2000);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prev) => ({
            data: {
                ...prev,
                [name]: value
            }
        }), () => {
            this.validate(name);
        })
        console.log('submit >>', this.state.isSubmitting)
    }

    validate = (fieldname) => {
        let err;
        switch (fieldname) {
          case 'username':
            err =    this.state.data[fieldname]
                    ? this.state.data[fieldname].length > 6
                        ? ''
                        : 'Weak Username'
                    : 'username required'
                    break;

            // case 'password':
            //     err =    this.state.data['confirmPassword']
            //         ? this.state.data['confirmPassword'] === this.state[fieldname]
            //             ? ''
            //             : 'not matched'
            //         : this.state.data[fieldname]
            //             ? this.state.data[fieldname].length > 6
            //                 ? ''
            //                 : 'Weak Password'
            //             : 'required'
            //             break;
                        case 'password':
                            err = this.state.data['confirmPassword']
                                ? this.state.data['confirmPassword'] === this.state.data[fieldname]
                                    ? ''
                                    : 'password didnot match'
                                : this.state.data[fieldname]
                                    ? this.state.data[fieldname].length > 6
                                        ? ''
                                        : 'weak password'
                                    : 'required field *';
                            break;
            

            // case 'confirmPassword':
            //     err =   this.state.data['password']
            //         ? this.state.data['password'] === this.state[fieldname]
            //             ? ''
            //             : 'not matched'
            //         : this.state.data[fieldname]
            //             ? this.state.data[fieldname].length > 6
            //                 ? ''
            //                 : 'Weak Password'
            //             : 'required'
            //             break;

                        case 'confirmPassword':
                err = this.state.data['password']
                    ? this.state.data['password'] === this.state.data[fieldname]
                        ? ''
                        : 'password did not match'
                    : this.state.data[fieldname]
                        ? this.state.data[fieldname].length > 6
                            ? ''
                            : 'weak password'
                        : 'required field*'
                break;


                        default:
                            break;
        }

        this.setState((prev) => ({
            error: {
                ...prev.errorb,
                [fieldname]: err
             
            }
        
        }), () => {
            const errors = Object.values(this.state.error).filter(errr => errr);
            this.setState({
                isValid : errors.length === 0
            })

        })
      
        console.log('error prev>>', this.state.error)
    

    }

    render() {
        console.log('submita >>', this.state.isSubmitting)
        let button = this.state.isSubmitting
        ?<button disabled type= "submit">Submiting....</button>
        :<button disabled = {!this.state.isValid} type= "submit" >Submit</button>
        return (
            <div>
                <h2>Register</h2>
                {/* <p>Current lesson : {this.state.didUpdate}</p> */}
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" placeholder="Name" onChange={this.handleChange}></input>
                    <p>{this.state.error.name}</p>
                    <label>Email</label>
                    <input className="form-control" type="text" name="email" placeholder="Email" onChange={this.handleChange}></input>
                    <p>{this.state.error.email}</p>
                    <label>Username</label>
                    <input className="form-control" type="text" name="username" placeholder="Username" onChange={this.handleChange}></input>
                    <p>{this.state.error.username}</p>
                    <label>Password</label>
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={this.handleChange}></input>
                    <p>{this.state.error.password}</p>
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>
                    <p>{this.state.error.confirmPassword}</p>
                    <label>Phone Number</label>
                    <input className="form-control" type="number" name="phoneNumber" onChange={this.handleChange}></input>
                    <p>{this.state.error.phoneNumber}</p>
                    <label>D.O.B</label>
                    <input className="form-control" type="date" name="dob" onChange={this.handleChange}></input>
                    <p>{this.state.error.dob}</p>
                    <label>Gender</label>
                    <input className="form-control" type="text" name="gender" onChange={this.handleChange}></input>
                    <p>{this.state.error.gender}</p>
                    <label>Temporary Address</label>
                    <input className="form-control" type="text" placeholder="Temporary Address" name="temporaryAddress" onChange={this.handleChange}></input>
                    <p>{this.state.error.temporaryAddress}</p>
                    <label>Permanent Address</label>
                    <input className="form-control" type="text" placeholder="Permanent Address" name="permanentAddress" onChange={this.handleChange}></input>
                    <p className="err" >{this.state.error.permanentAddress}</p>
                    {button}

                </form>
            </div>

        )
    }

}