import React from 'react';
import { connect } from 'react-redux'
import NewMessageForm from '../components/NewMessageForm';

class MessageBox extends React.Component {
    
    orderedMessages = messages => {
        const sortedMessages = messages.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        return sortedMessages.map(message => {
        return (<li key={message.id} id='each-message'>{message.content}</li>);
        });
    };
    
    render() {
        const { convos, activeConvoId } = this.props
        const conversation = convos.find(
            conversation => conversation.id === activeConvoId
        ) 
        return (
            <div className = 'col s12 m8 l8 message-box'>
                <div>
                    <h2>{conversation.title}</h2>
                </div>
                <ul>
                    {this.orderedMessages(conversation.messages)}
                </ul>
                <NewMessageForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        convos: state.convos,
        activeConvoId: state.activeConvoId
    }
}

export default connect(mapStateToProps)(MessageBox);