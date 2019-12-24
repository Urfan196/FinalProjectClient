import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SignIn from '../containers/SignIn'

class Welcome extends Component {



    render() {
        return (
            <div>
                {<SignIn history={this.props.history}/>}
                <Link to='/signup-user'><button>Sign Up</button></Link>
            </div>
        );
    }
}

export default Welcome;

