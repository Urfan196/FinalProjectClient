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
            <div className = 'col s12 m4 l3'> 
                <div className ='card'>
                    <div className="card-image">
                        <img src={imageUrl} alt="Item image" height="270" />
                    </div>
                    <div className = "card-content-fixed">
                        <h5 className = "teal-text text-darken-1">{title}</h5>
                        <p className = 'truncate'>Description: {description}</p>
                        <div className="card-action">
                            <div className= 'row'>
                                {available ? 
                                    <button className ="waves-effect waves-light btn teal lighten-1" onClick = {(e)=> editItemAvailablity(e, item)}>Available</button> 
                                    : <button className = "waves-effect waves-teal btn-flat" onClick = {(e)=> editItemAvailablity(e, item)}> Not Available </button>
                                }
                            </div>
                            <div>
                                <Link to='/edit-item' onClick={() => selectedItem(item)}><button className = 'btn-floating btn waves-effect waves-light blue'>
                                    <i className="material-icons">edit</i>Edit Item</button></Link>
                                <button className = 'btn-floating btn waves-effect waves-light red' onClick={(e)=> deleteItem(e, item, history)} >
                                    <i className="material-icons">delete</i>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
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

