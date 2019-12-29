import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from '../containers/Navbar'
import ListingCard from './ListingCard'

const Profile = (props) => {

    const {id, first_name, last_name, birthday, email, location} = props.currentUser
    const filteredArray = props.items.filter(item => item.user_id === id)

    return (
        <div>
            <div className = 'row'>
               {<Navbar/>} 
            </div>
            <div className = 'row'>
                <i className="material-icons large">account_circle</i>
                <h3 className="pink-text text-accent-3">{first_name + ' ' + last_name}</h3>
                <h6><strong>Birthday: </strong>{birthday}</h6>
                <h6><strong>Email: </strong>{email}</h6>
                {location ? <h6><strong>Your current location: </strong>{location.address}</h6> : <h6>Loading...</h6>}
            </div>
            <div className = 'row '>
                <div >
                    <Link to='/edit-profile'><button className = 'waves-effect waves-light btn'>
                        <i className="material-icons left">edit</i>Edit Profile</button></Link>
                    <Link to='/add-address' ><button className = 'waves-effect waves-light btn'>
                        <i className="material-icons left">edit_location</i>Change Your Address</button></Link>
                </div>
            </div>
            <div className = 'row '>
                <div className = 'divider container'></div>
                <h4>Your Listings:</h4>
                <div className = 'divider container'></div>
            </div>
            <div className = 'container row'>
                {filteredArray.map(item => <ListingCard key={item.id} item={item} history={props.history} />)}
            </div>
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        items: state.items,
        locations: state.locations
    }
}

export default connect(mapStateToProps)(Profile);