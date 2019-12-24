import React, { Component } from 'react';
import { connect } from 'react-redux'
import signUpUser from '../actions/signUpUser'

export class SignUpUser extends Component {

    state = {
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    } 

    render() {
       const { firstName, lastName, birthday, email, password } = this.state
        return (
            <div>

                <form onSubmit={(e) => this.props.signUpUser(e, this.state, this.props.history)}>
                    <label htmlFor="firstName">First Name</label>
                    <br/><input name="firstName" value={firstName} onChange={this.handleChange}/>
                    <br/><label htmlFor="lastName">Last Name</label>
                    <br/><input name="lastName" value={lastName} onChange={this.handleChange}/>
                    <br/><label htmlFor="birthday">Birthday</label>
                    <br/><input type='date' name="birthday" value={birthday} onChange={this.handleChange}/>
                    <br/><label htmlFor="email">Email</label>
                    <br/><input type='email' name="email" value={email} onChange={this.handleChange}/>
                    <br/><label htmlFor="password">Password</label>
                    <br/><input type='password' name="password" value={password} onChange={this.handleChange}/>

                    <br/><input type="submit" value="Next"/>
                </form>
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: (e, state, history) => dispatch(signUpUser(e, state, history))
    }
}

export default connect(null, mapDispatchToProps)(SignUpUser);