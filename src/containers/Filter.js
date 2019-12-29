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
        
                
                    <div className = 'container row'>
                        <div className = "col l6 m6 s12"> 
                            <p>Choose range (mi):</p>
                            <div className = 'row'>
                                <label className = "col l2 m2 s12">
                                    <input type="radio" name='distance' onClick ={this.handleClick} defaultChecked={this.state.distance} value='10'/>
                                    <span>10</span>
                                </label>
                                <label className = "col l2 m2 s12">
                                    <input type="radio" name='distance' onClick ={this.handleClick} value='20'/>
                                    <span>20</span>
                                </label>
                                <label className = "col l2 m2 s12">
                                    <input type="radio" name='distance' onClick ={this.handleClick} value='30'/>
                                    <span>30</span>
                                </label>
                                <label className = "col l2 m2 s12">
                                    <input type="radio" name='distance' onClick ={this.handleClick} value='40'/>
                                    <span>40</span>
                                </label>
                                <label className = "col l2 m2 s12">
                                    <input type="radio" name='distance' onClick ={this.handleClick} value='50'/>
                                    <span>50</span>
                                </label>
                            </div>
                        </div>

                        <div className = 'col l4 m4 s12'>
                            <p>Choose category:</p>
                            <div className = 'row'>
                                <label className = 'col l4 m4 s12'>
                                    <input type="radio" name='category' onClick ={this.handleClick} defaultChecked = {this.state.category} value='All'/>
                                    <span>All</span>
                                </label>
                                <label className = 'col l4 m4 s12'>
                                    <input type="radio" name='category' onClick ={this.handleClick} value='food'/>
                                    <span>Food</span>
                                </label>
                                <label className = 'col l4 m4 s12'>
                                    <input type="radio" name='category' onClick ={this.handleClick} value='non-food'/>
                                    <span>Other</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="waves-effect waves btn pink accent-3" type="submit"><i className="material-icons right">filter_list</i>Apply Filter</button>
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
