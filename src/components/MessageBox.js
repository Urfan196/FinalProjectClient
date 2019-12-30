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
        const { title, messages } = this.props.activeConvo
        return (
            <div>
                <h2>{title}</h2>
                <ul>{this.orderedMessages(messages)}</ul>
                <NewMessageForm />  
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         activeConvo: state.activeConvo
//     }
// }

export default MessageBox;

// connect(mapStateToProps)(