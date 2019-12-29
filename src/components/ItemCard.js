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
                <div className = 'col s12 m4 l3'>
                    <div className ='card'>
                        <div className="card-image">
                            <img src={this.state.image} alt="Item image" height="270"  />
                        </div>
                        <div className = "card-content-fixed">
                            <h5 className="teal-text text-darken-1">{item.title}</h5>
                            <p className="black-text text-darken-1">{formattedDistance} mi far away</p>
                        </div>
                    </div>
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