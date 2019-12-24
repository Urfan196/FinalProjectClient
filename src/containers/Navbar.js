import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    
    handleSignOut = e => {
        localStorage.clear()
        this.props.clearCurrentUser()
    }

    render() {
        return (
            <div>
                <Link to = '/share-item'>Share</Link>
                <Link to = '/home'>Home</Link>
                <Link to = '/profile'>Profile</Link>
                <Link to = '/messages'>Messages</Link>
                <Link to = '/' onClick={this.handleSignOut}>Sign Out</Link>

            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
    }
}

export default connect(null, mapDispatchToProps)(Navbar);
