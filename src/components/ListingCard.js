import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import deleteItem from '../actions/deleteItem'
import editItemAvailablity from '../actions/editItemAvailablity'

 
class ListingCard extends Component {

    
    render () {
        const {title, description, available, imageUrl} = this.props.item
        const {item, history, selectedItem, deleteItem, editItemAvailablity} = this.props

        return(
            <div> 
                <img src={imageUrl} alt="Item image" height="150" width="150" />
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <Link to='/edit-item' onClick={() => selectedItem(item)}><button>Edit Item</button></Link>
                {available ? <button onClick = {(e)=> editItemAvailablity(e, item)}>Available</button> : <button onClick = {(e)=> editItemAvailablity(e, item)}> Not Available </button>}

                <button onClick={(e)=> deleteItem(e, item, history)} >Delete</button>
            </div>
        ) 
    }
    
}
 

const mapsToDispatchProps = dispatch =>{
    return{
        selectedItem: (item) => dispatch({type: 'SET_SELECTED_ITEM', item: item}),
        deleteItem: (e, item, history) => dispatch(deleteItem(e, item, history)),
        editItemAvailablity: (e, item) => dispatch(editItemAvailablity(e, item))
    }
}

export default connect(null, mapsToDispatchProps)(ListingCard)

