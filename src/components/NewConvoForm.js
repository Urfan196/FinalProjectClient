import React from 'react';
import {connect} from 'react-redux'

const NewConvoForm = props =>{

    const {selectedItem, currentUser} = props
    const {id, first_name, last_name} = selectedItem.location.user
    const {title} = selectedItem.item

    const startConvo = () => {
        fetch('http://localhost:3000/convos', {
            method: 'POST',
            headers: {
            "Authorization": `${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                title,
                receiver_id: id,
                sender_id: currentUser.id
            })
        })
        .then(() => props.activeConvoForm())
    }

    return (
            <div>
                <label>New Conversation:</label>
                <p>To: {first_name+ ' ' + last_name}</p>
                <p>From: {currentUser.first_name+ ' ' + currentUser.last_name}</p>
                <button onClick={startConvo} className = 'waves-effect waves-light btn teal lighten-1'>Start a conversation</button>
            </div>
    );
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

export default connect(mapStateToProps, mapsToDispatchProps)(NewConvoForm);
