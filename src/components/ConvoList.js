import React, { Component } from 'react';
import { connect } from 'react-redux'

export class ConvoList extends Component {

    render() {
        const {convos, handleClick} = this.props
        return (
            <div>
                <h2>Conversations:</h2>
                <ul>{
                    convos.map(conversation => {
                        return (
                          <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
                            {conversation.title}
                          </li>
                        )
                    })
                }</ul>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        convos: state.convos
    }
}

const mapsToDispatchProps = dispatch => {
    return {
        handleClick: (convoId) => dispatch({type: 'SET_ACTIVE_CONVO', convoId})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(ConvoList);