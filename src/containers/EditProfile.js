import React, { Component } from 'react';
import Navbar from './Navbar'
import {connect} from 'react-redux'
import editProfile from '../actions/editProfile'
import deleteUser from '../actions/deleteUser'

class EditProfile extends Component {

    state = {
        firstName: this.props.currentUser.first_name,
        lastName: this.props.currentUser.last_name,
        email: this.props.currentUser.email,
        birthday: this.props.currentUser.birth_day
    }

    // componentDidUpdate() {
    //     const {first_name, last_name, email, birth_day} = this.props.currentUser
    //     if(Object.keys(this.props.currentUser).length > 0 && this.state.firstName == undefined){
    //       this.setState({
    //         firstName: first_name,
    //         lastName: last_name,
    //         email: email,
    //         birthday: birth_day
    //       })
    //     }
    // }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    } 

    render() {
        const {firstName, lastName, birthday, email} = this.state
        const {editProfile, deleteUser, history, currentUser} = this.props
        return (
            <div>
                {<Navbar/>}
                <form onSubmit={(e)=> editProfile(e, history, this.state, currentUser.id)}>
                    <label htmlFor="firstName">First Name</label>
                    <br/><input name="firstName" value={firstName} onChange={this.handleChange}/>
                    <br/><label htmlFor="lastName">Last Name</label>
                    <br/><input name="lastName" value={lastName} onChange={this.handleChange}/>
                    <br/><label htmlFor="birthday">Birthday</label>
                    <br/><input type='date' name="birthday" value={birthday} onChange={this.handleChange}/>
                    <br/><label htmlFor="email">Email</label>
                    <br/><input type='email' name="email" value={email} onChange={this.handleChange}/>

                    <br/><input type="submit" value="Update"></input>
                </form>
                <button onClick={(e) => deleteUser(e, history, currentUser)} >Delete Your Account</button>
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
        editProfile: (e, history, state, id) => dispatch(editProfile(e, history, state, id)),
        deleteUser: (e, history, user) => dispatch(deleteUser(e, history, user))
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(EditProfile);
