import React, { Component } from 'react';
import { connect } from 'react-redux'
import signIn from '../actions/signIn'

class SignIn extends Component {

    state = {
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
        const{email, password} = this.state

        return (
            <div>
                <h1>Sign in</h1>
                <form onSubmit={(e) => this.props.signIn(e, this.state, this.props.history)}>
                    <label htmlFor="email">Email</label>
                    <br/><input type='email' name="email" value={email} onChange={this.handleChange}/>
                    <br/><label htmlFor="email">Password</label>
                    <br/><input type='password' name="password" value={password} onChange={this.handleChange}/>
                    <br/><input type="submit" value="Sign In"></input>
                </form>
            </div>
        );
    }  

}

const mapDispatchToProps = dispatch => {
    return {
      signIn: (e, state, history) => dispatch(signIn(e, state, history))
    }
  }

export default connect(null, mapDispatchToProps)(SignIn);