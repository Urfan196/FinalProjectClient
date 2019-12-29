import React, { Component } from 'react';
import Navbar from './Navbar'
import { connect } from 'react-redux'
import editItem from '../actions/editItem'
import deleteItem from '../actions/deleteItem'

class EditItem extends Component {

    state = {
        title: this.props.selectedItem.title,
        description: this.props.selectedItem.description,
        category: this.props.selectedItem.category,
        image: this.props.selectedItem.image
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
        const {title, description, category} = this.state
        const {selectedItem, history, deleteItem, editItem} = this.props
        const {id} = selectedItem
        return (
            <div>
                <div className = 'row'>
                    {<Navbar/>}
                </div>
                <div className= 'form-edit' >
                    <form className = 'container' onSubmit={(e) => editItem(e, this.state, id, history)}>
                        
                        <img src={selectedItem.imageUrl} alt="Item image" height="200" width="200" />
                        
                        <div className="file-field input-field ">
                            <div className="btn teal">
                                <span><i className="material-icons right">image</i>Choose File</span>
                                <input type="file" accept="image/*" onChange={this.handleUpload}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    
                        <label htmlFor="title">Title:</label>
                        <input name="title" value={title} onChange={this.handleChange}/>
                        <label htmlFor="description"><strong>Description</strong></label>
                        <textarea className="materialize-textarea" name="description" value={description} onChange={this.handleChange}/>


                        <label>Category:</label>
                        <select className="browser-default" name="category" value={category} onChange={this.handleChange}>
                                <option value="" disabled selected>Choose a category</option>
                                <option value="food">food</option>
                                <option value="non-food">non-food</option>
                        </select>

                        <br/><button className="waves-effect waves btn  blue" type="submit">
                            <i className="material-icons right">update</i>Update
                        </button>
                    </form>

                    <br/><button className="waves-effect waves btn  pink accent-3" onClick={(e) => deleteItem(e, selectedItem, history)}>
                            <i className="material-icons right">delete</i>Delete Item
                    </button>
                </div>
            </div>
        );
    }  
}
 
const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem
    }
}

const mapsToDispatchProps = dispatch => {
    return {
        editItem: (e, state, id, history) => dispatch(editItem(e, state, id, history)),
        deleteItem: (e, item, history) => dispatch(deleteItem(e, item, history))
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(EditItem);
