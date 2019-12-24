import React, { Component } from 'react';
import {connect} from 'react-redux'
import setAddress from '../actions/setAddress'

export class SignUpAddress extends Component {

    state = {
        street: '',
        city: '',
        zip: '',
        state: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        }) 
    }

    render() {
       const { street, city, zip, state } = this.state
       const {setAddress, currentUser, history} = this.props
       const button = currentUser.location ? "Change address" : "Sign Up"

        return (
            <div>
                {currentUser.location ? (<h1>Add your new address</h1>) : (<h1>Add your address</h1>)}
                
                <form onSubmit={(e) => setAddress(e, this.state, history, currentUser)}>
                    <label htmlFor="street">Street Address</label>
                    <br/><input name="street" value={street} onChange={this.handleChange}/>
                    <br/><label htmlFor="city">City</label>
                    <br/><input name="city" value={city} onChange={this.handleChange}/>
                    <br/><label htmlFor="state">State</label>
                    <br/><input name="state" value={state} onChange={this.handleChange}/>
                    <br/><label htmlFor="zip">Zip code</label>
                    <br/><input name="zip" value={zip} onChange={this.handleChange}/>
                    <br/><input type="submit" value={button}></input>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser
    }
  }

const mapsToDispatchProps = dispatch => {
    return {
        setAddress: (e, stateInfo, history, currentUser) => dispatch(setAddress(e, stateInfo, history, currentUser))
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(SignUpAddress);
