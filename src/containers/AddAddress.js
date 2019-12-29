import React, { Component } from 'react';
import {connect} from 'react-redux'
import setAddress from '../actions/setAddress'
import Navbar from './Navbar'

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

        return (
            <div>
                {currentUser.location && <div className = 'row'>{<Navbar/>}</div>}
                <div className="container">
                    {currentUser.location ? (<h4>Add your new address</h4>) : (<h4>Add your address</h4>)}
                    <form className ='form-edit' onSubmit={(e) => setAddress(e, this.state, history, currentUser)}>
                        <div className="input-field col s12">
                            <label>Street Address</label>
                            <input className = 'validate' type="text" name="street" value={street} onChange={this.handleChange}/>
                        </div>
                        <div className="input-field col s12">
                            <label>City</label>
                            <input className = 'validate' type="text" name="city" value={city} onChange={this.handleChange}/>
                        </div>
                        <div className="input-field col s12">
                            <label>State</label>
                            <input className = 'validate' type="text" name="state" value={state} onChange={this.handleChange}/>
                        </div>
                        <div className="input-field col s12">
                            <label>Zip code</label>
                            <input className = 'validate' type="number" name="zip" value={zip} onChange={this.handleChange}/>
                        </div>
                        {currentUser.location ?
                            (<button className="waves-effect waves btn" type="submit">
                                <i className="material-icons right">edit_location</i>Change Address</button>)
                            : (<button className="waves-effect waves-light btn pink accent-3" type="submit">
                                <i className="material-icons right">exit_to_app</i>Sign Up</button>)
                        } 
                    </form>
                </div>
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
