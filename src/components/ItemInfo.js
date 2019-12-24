import React from 'react'
import {connect} from 'react-redux'
import Navbar from '../containers/Navbar'

const ItemInfo = (props) => {

    const {image, item, location} = props.selectedItem
    const {title, description, available} = item
    const {first_name, last_name} = location.user
    
    const splittedLoc = location.address.split(', ')
    const address = splittedLoc[1] + ', ' + splittedLoc[2]

    return (
        <div>
            {<Navbar/>}
            <img src={image} alt="Item image" height="400" width="400"/>
            <h5>Title: {title}</h5>
            <p>Description: {description}</p>
            {available ? <p>Available</p> : <p>Not Available</p> }

            <p>{first_name + ' ' +last_name }</p>
            <p>Address: {address}</p>
            
            <button>Message {first_name}</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem
    }
}

export default connect(mapStateToProps)(ItemInfo)