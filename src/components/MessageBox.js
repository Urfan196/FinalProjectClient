import React from 'react';
import { connect } from 'react-redux'
import NewMessageForm from '../components/NewMessageForm';

class MessageBox extends React.Component {
    
    orderedMessages = messages => {
        const sortedMessages = messages.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        return sortedMessages.map(message => {
            return (<li key={message.id}>{message.content}</li>);
        });
    };
    
    render() {
        const { convos, activeConvoId } = this.props
        const conversation = convos.find(
            conversation => conversation.id === activeConvoId
        )
        // debugger
        return (
            <div>
                <h2>{conversation.title}</h2>
                <ul>{this.orderedMessages(conversation.messages)}</ul>
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