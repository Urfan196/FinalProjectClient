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
            {<Navbar/>}

            <h1>{first_name + ' ' + last_name}</h1>
            <p>Birthday: {birthday}</p>
            <p>Email: {email}</p>
            {location ? <p>Your current location: {location.address}</p> : <p>Loading...</p>}
            <Link to='/edit-profile'><button>Edit Profile</button></Link>
            <Link to='/add-address' ><button>Change Your Address</button></Link>

            <h1>Your Listings:</h1>
            {filteredArray.map(item => <ListingCard key={item.id} item={item} history={props.history} />)}

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