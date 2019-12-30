import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import NewConvoForm from '../components/NewConvoForm';
import ConvoList from '../components/ConvoList';
import MessageBox from '../components/MessageBox';
import { connect } from 'react-redux'



 class MessageContainer extends Component {

    handleReceivedConvo = response => {
        const { convo } = response;
        this.props.receivedConvo(convo)
      };
    
    handleReceivedMessage = (response) => {
        
        const { message } = response;
        const {convos} = this.props
        const conversation = convos.find(
            conversation => conversation.id === message.convo_id
        );
        conversation.messages = [...conversation.messages, message];
        this.props.receivedMessage(conversation)
    };

     render() {
        const { convos, activeConvo } = this.props
        
         return (
            <div>
                <ActionCable
                    channel={{ channel: 'ConvosChannel' }}
                    onReceived={this.handleReceivedConvo}
                />

                { convos.length && (
                    convos.map(conversation => {
                        return (
                        <ActionCable
                            key={conversation.id}  
                            channel={{ channel: 'MessagesChannel', convo: conversation.id }}
                            onReceived={this.handleReceivedMessage}
                        />
                        );
                    })
                )}

                <ConvoList convos={convos}/>

                <NewConvoForm />

                { Object.keys(activeConvo).length !==0 && (
                    <MessageBox activeConvo={activeConvo}/>
                )}

            

            </div>
         );
     }
 }

const mapStateToProps = state => {
    return {
        convos: state.convos,
        activeConvo: state.activeConvo
    }
}

const mapsToDispatchProps = dispatch => {
    return{
        receivedConvo: (convo) => dispatch({type: 'ADD_CONVO', convo}),
        receivedMessage: (convo) => dispatch({type: 'SET_MESSAGE_OF_CONVO', convo})
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(MessageContainer);
 