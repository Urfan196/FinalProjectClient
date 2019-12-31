// import React from 'react';
// import { ActionCable } from 'react-actioncable-provider';
// import NewConversationForm from './NewConversationForm';
// import MessagesArea from './MessagesArea';
// import Cable from './Cable';


// class ConversationsList extends React.Component {
//     state = {
//       conversations: [],
//       activeConversation: null
//     };
  
//     componentDidMount = () => {
//       fetch('http://localhost:3000/convos')
//         .then(res => res.json())
//         .then(conversations => this.setState({ conversations }));
//     };
  
//     handleClick = id => {
//       this.setState({ activeConversation: id });
//     };
  
//     handleReceivedConversation = response => {
//       const { convo } = response;
//       this.setState({
//         conversations: [...this.state.conversations, convo]
//       });
//     };
  
//     handleReceivedMessage = response => {
//       const { message } = response;
//       const conversations = [...this.state.conversations];
//       const conversation = conversations.find(
//         conversation => conversation.id === message.convo_id
//       );
//       conversation.messages = [...conversation.messages, message];
//       this.setState({ conversations });
//     };
  
//     render = () => {
//       const { conversations, activeConversation } = this.state;
//       return (
//         <div className="conversationsList">

//           {<ActionCable
//             channel={{ channel: 'ConvosChannel' }}
//             onReceived={this.handleReceivedConversation}
//           />
//           }

//           {
//             conversations.length && (
//               <Cable
//                 conversations={conversations}
//                 handleReceivedMessage={this.handleReceivedMessage}
//               />
//             )
//           } 

//           <h2>Conversations:</h2>

//           <ul>{mapConversations(conversations, this.handleClick)}</ul>

//           <NewConversationForm />

//           {activeConversation && (
//             <MessagesArea
//               conversation={findActiveConversation(
//                 conversations,
//                 activeConversation
//               )}
//             />
//           )}
//         </div>
//       );
//     };
//   }
  
//   export default ConversationsList;
  
//   //helpers
  
//   const findActiveConversation = (conversations, activeConversation) => {
//     return conversations.find(
//       conversation => conversation.id === activeConversation
//     );
//   };
  
//   const mapConversations = (conversations, handleClick) => {
//     return conversations.map(conversation => {
//       return (
//         <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
//           {conversation.title}
//         </li>
//       );
//     });
//   };