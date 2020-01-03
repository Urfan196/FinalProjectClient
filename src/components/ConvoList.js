import React, { Component } from 'react';
import { connect } from 'react-redux'

export class ConvoList extends Component {

    render() {
        const {convos, currentUser, handleClick} = this.props
        return (
            <div className = 'col s12 m3 l3 convo-list'>
                <h6 className = 'pink-text text-accent-3'><strong>Conversations:</strong></h6>
                <ul>{
                    convos.map(conversation => {
                        if (conversation.sender_id === currentUser.id || conversation.receiver_id === currentUser.id){ 
                            return (<li key={conversation.id} onClick={() => handleClick(conversation.id)}>
                                    {conversation.title}
                                </li>)
                        }
                    })
                }</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        convos: state.convos,
        currentUser: state.currentUser
    }
}

const mapsToDispatchProps = dispatch => {
    return {
        handleClick: (convoId) => dispatch({type: 'SET_ACTIVE_CONVO', convoId})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(ConvoList);