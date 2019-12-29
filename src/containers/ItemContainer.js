import React, {Component} from 'react';
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Filter from './Filter'
import ItemCard from '../components/ItemCard'
import fetchNearLocations from '../actions/fetchNearLocations'

class ItemContainer extends Component {

    componentDidMount () {
        this.props.fetchNearLocations(null, this.props.currentUser)
    }
    
    render () {  
        const {filterCategory} = this.props
        
        return (
            <div>
                <div className = 'row'>
                    {<Navbar/>}
                </div>
                <div className = 'container row'>
                    {<Filter/>}
                </div>
                <div className="container row divider"></div>
                <div className ='container row'>
                    {
                        this.props.locations.map (obj => {
                            const {location, distance, items} = obj
                            const itemCard = items.map(item => {
                                if(filterCategory === 'All') {
                                    return (item.available) && <ItemCard key={item.id} item={item} distance={distance} location={location}/>
                                } else {
                                    return (item.available && item.category == filterCategory) 
                                    && <ItemCard key={item.id} item={item} distance={distance} location={location}/>
                                }
                            })
                            return itemCard
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items, 
        currentUser: state.currentUser,
        locations: state.locations,
        filterCategory: state.filterCategory
    }
}

const mapsToDispatchProps = dispatch => {
    return{
      fetchNearLocations: (e, user) => dispatch(fetchNearLocations(e, user))
    }
  }

export default connect(mapStateToProps, mapsToDispatchProps)(ItemContainer);
