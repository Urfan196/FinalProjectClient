import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
 
class ItemCard extends Component {

    state = {
        image: '',
        item: this.props.item,
        location: this.props.location
    }

    componentDidMount () {
        this.getImage(this.props.item.id)
    }

    getImage = (id) => {
        fetch(`http://localhost:3000/items/${id}`, {
            method: "GET",
            headers: {
              "Authorization": `${localStorage.getItem('jwt')}`,
              "Accept": "application/json"
            } 
        })
        .then(res => res.json())
        .then(item => {
            this.setState({
                image: item.imageUrl
            })
        })
    }

    handleClick = () => {
        this.props.selectedItem(this.state)
    }
   
    render () {
        const {item, distance} = this.props
        const formattedDistance = Math.round(distance*10)/10;
        return (
            <Link to='/item-info' onClick={this.handleClick} > 
                <div>
                    <h5>{item.title}</h5> 
                    <img src={this.state.image} alt="Item image" height="150" width="150" />
                    <p>{formattedDistance} mi far away</p>
                </div>
            </Link>
        )
    }
}

const mapsToDispatchProps = dispatch =>{
    return{
        selectedItem: (state) => dispatch({type: 'SET_SELECTED_ITEM', item: state})
    }
}

export default connect(null, mapsToDispatchProps)(ItemCard);