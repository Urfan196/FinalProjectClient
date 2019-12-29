import React, { Component } from 'react';
import Navbar from './Navbar'
import {connect} from 'react-redux'
import shareItem from '../actions/shareItem'

class ShareItem extends Component {

    state = {
        image: '',
        title: '',
        description: '',
        category: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        }) 
    }

    handleUpload = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    render() {
        const {title, description}  = this.state
        const {shareItem, history, currentUser} = this.props

        return (
            <div >
                <div className = 'row'>
                    {<Navbar/>}
                </div>
                <h3>Share an item</h3>
                <div className="container row">
                    <form className= 'form-item' onSubmit={(e) => shareItem(e, history, currentUser, this.state) }>
                        <div className="input-field col s12">
                            <label>Title:</label>
                            <input className = 'validate' type="text" name="title" value={title} onChange={this.handleChange}/>
                        </div>
                        <div className="input-field col s12">
                            <label>Description:</label>
                            <textarea className="materialize-textarea" type="text" name="description" value={description} onChange={this.handleChange}/>
                        </div>
                        <select className="browser-default" name="category" onChange={this.handleChange}>
                            <option value="" disabled selected>Choose a category</option>
                            <option value="food">food</option>
                            <option value="non-food">other</option>
                        </select>
                        <div className="file-field input-field ">
                            <div className="btn teal">
                                <span><i className="material-icons right">image</i>Choose File</span>
                                <input type="file" accept="image/*" onChange={this.handleUpload}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                        <button className="waves-effect waves btn-large  pink accent-3" type="submit">
                            <i className="material-icons right">share</i>Share</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapsToDispatchProps = dispatch => {
    return {
        shareItem: (e, history, user, state) => {dispatch(shareItem(e, history, user, state))}
    }
} 

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser
    }
  }

export default connect(mapStateToProps, mapsToDispatchProps)(ShareItem);
