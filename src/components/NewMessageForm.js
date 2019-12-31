import React from 'react';
import { connect } from 'react-redux'

class NewMessageForm extends React.Component {
  state = {
    content: '',
    convo_id: this.props.activeConvoId
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        // "Authorization": `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ content: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => {
    return {
        activeConvoId: state.activeConvoId
    }
}

export default connect(mapStateToProps)(NewMessageForm);