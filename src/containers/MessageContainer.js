import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider'
import NewConvoForm from '../components/NewConvoForm';
import ConvoList from '../components/ConvoList';
import MessageBox from '../components/MessageBox';
import Navbar from './Navbar';
import { connect } from 'react-redux'



 class MessageContainer extends Component {

    handleReceivedConvo = response => {
        const { convo } = response;
        this.props.receivedConvo(convo)
        this.props.startConvo(convo.id)
    }; 
    
    handleReceivedMessage = (response) => {
        const { message } = response
        const {convos} = this.props
        const conversation = convos.find(
            conversation => conversation.id === message.convo_id
        );
        conversation.messages = [...conversation.messages, message];
        this.props.receivedMessage(conversation)
    };

    render() {
        const { convos, activeConvoId, activeConvoForm } = this.props
        return (
            <div>
                <ActionCableConsumer
                    channel={{ channel: 'ConvosChannel' }}
                    onReceived={this.handleReceivedConvo}
                />
                { convos.length && (
                    convos.map(conversation => { 
                        return (
                        <ActionCableConsumer
                            key={conversation.id}  
                            channel={{ channel: 'MessagesChannel', convo: conversation.id }}
                            onReceived={this.handleReceivedMessage}
                        />
                        );
                    })
                )} 
                <div className = 'row'>
                    {<Navbar/>}
                </div>
                { activeConvoForm && (
                    <NewConvoForm/>
                )}
                <div className = 'container row'>
                    <ConvoList /> 
                    { activeConvoId && (
                        <MessageBox />
                    )}
                </div>
                
            </div>
        );
    }
 }

const mapStateToProps = state => {
    return {
        convos: state.convos,
        activeConvoId: state.activeConvoId,
        activeConvoForm: state.activeConvoForm
    }
}

const mapsToDispatchProps = dispatch => {
    return{
        receivedConvo: (convo) => dispatch({type: 'ADD_CONVO', convo}),
        receivedMessage: (convo) => dispatch({type: 'SET_MESSAGE_OF_CONVO', convo}),
        startConvo: (convoId) => dispatch({type: 'SET_ACTIVE_CONVO', convoId})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(MessageContainer);
 