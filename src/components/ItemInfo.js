import React from 'react'
import {connect} from 'react-redux'
import Navbar from '../containers/Navbar'
import { Link } from 'react-router-dom';


const ItemInfo = (props) => {

    const {image, item, location} = props.selectedItem
    const {title, description, available} = item
    const {first_name, last_name} = location.user
    
    const splittedLoc = location.address.split(', ')
    const address = splittedLoc[1] + ', ' + splittedLoc[2]

    return (
        <div>
            <div className = 'row'>
                {<Navbar/>}
            </div>

            <div className = 'container row'>
                <div className = 'col s12 m6 l6'>
                    <img src={image} alt="Item image" height="500" width="500" />
                </div>
                <div className = 'user-card col s12 m6 l6'>
                    <i className="material-icons large">account_circle</i>
                    <h3 className="pink-text text-accent-3">{first_name + ' ' +last_name }</h3>
                    <h6>{address}</h6><br/>
                    <Link to = '/messages'><button className="waves-effect waves-light btn-large  pink accent-3" onClick={props.activeConvoForm}>
                        <i className="material-icons right">message</i>Message {first_name}</button></Link>
                </div>
            </div>

            <div className = 'container row'>
                <div className = 'col s12 m6 l6'>
                    <div className="container divider">
                    </div>
                    <div>
                        <blockquote className="">
                            <h4>{title}</h4>
                            {available ? 
                                <h6 className="blue-text"><i className="material-icons">check</i>Item is Available</h6> : 
                                <h6 className="red-text"><i className="material-icons">close</i>Item is not Available</h6>
                            }
                            <p className = 'left-align'>Description: {description}</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        currentUser: state.currentUser
    }
}

const mapsToDispatchProps = dispatch => {
    return{
        activeConvoForm: () => dispatch({type: 'SET_CONVO_FORM'})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(ItemInfo)