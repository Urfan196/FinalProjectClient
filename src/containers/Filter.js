import React, { Component } from 'react';
import {connect} from 'react-redux'
import fetchNearLocations from '../actions/fetchNearLocations'

class Filter extends Component {

    state = {
        distance: '10',
        category: 'All'
    }
    
    handleClick = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        const {currentUser, fetchNearLocations, filterCategory} = this.props
        const {distance, category} = this.state
        fetchNearLocations(e, currentUser, distance)
        filterCategory(category)
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                    <p>Choose range (mi):</p>
                    <input type="radio" name='distance' onClick ={this.handleClick} defaultChecked={this.state.distance} value='10'/>10
                    <input type="radio" name='distance' onClick ={this.handleClick} value='20'/>20
                    <input type="radio" name='distance' onClick ={this.handleClick} value='30'/>30
                    <input type="radio" name='distance' onClick ={this.handleClick} value='40'/>40
                    <input type="radio" name='distance' onClick ={this.handleClick} value='50'/>50
                    </div>
                    <div>
                    <p>Choose category:</p>
                    <input type="radio" name='category' onClick ={this.handleClick} defaultChecked = {this.state.category} value='All'/>All
                    <input type="radio" name='category' onClick ={this.handleClick} value='food'/>food
                    <input type="radio" name='category' onClick ={this.handleClick} value='non-food'/>non-food
                    </div>
                    <br/><input type="submit" value="Apply Filter" />
                </form>
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
        fetchNearLocations: (e, user, distance) => dispatch(fetchNearLocations(e, user, distance)),
        filterCategory: (category) => dispatch({ type: 'SET_FILTER_CATEGORY', category})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(Filter) ;
