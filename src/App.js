import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Welcome from './containers/Welcome'
import SignUpUser from './containers/SignUpUser'
import AddAddress from './containers/AddAddress'
import ItemContainer from './containers/ItemContainer'
import ShareItem from './containers/ShareItem'
import ItemInfo from './components/ItemInfo'
import EditItem from './containers/EditItem'
import MessageContainer from './containers/MessageContainer'
import ConversationsList from './containers/ConversationsList'
import Profile from './components/Profile'
import EditProfile from './containers/EditProfile'
import fetchAllItems from './actions/fetchAllItems'
import fetchAllUsers from './actions/fetchAllUsers'
import fetchAllConvos from './actions/fetchAllConvos'
import reAuth from './actions/reAuth'
import './App.css';


class App extends React.Component {

  componentDidMount () {
      this.props.reAuth()
      this.props.fetchAllItems()
      this.props.fetchAllUsers()
      this.props.fetchAllConvos()
  }


  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component ={Welcome}/>
            <Route exact path='/signup-user' component={SignUpUser}/>
            
            { this.props.currentUser ?
            <>
              <Switch>
                <Route exact path='/add-address' component={AddAddress}/>
                <Route exact path='/home' component={ItemContainer}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/edit-profile' component={EditProfile}/>
                <Route exact path='/share-item' component={ShareItem}/>
                <Route exact path='/item-info' component={ItemInfo}/>
                <Route exact path='/edit-item' component={EditItem}/>
                <Route exact path='/messages' component={MessageContainer}/>
                <Route exact path='/convo-list' component={ConversationsList}/>
              </Switch>
            </> : 
            <p>Please Sign In</p>
            }

          </Switch>
        </Router>
      </div>
    );
  }



}
  
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapsToDispatchProps = dispatch => {
  return{
    reAuth: () => dispatch(reAuth()),
    fetchAllItems: ()=> dispatch(fetchAllItems()),
    fetchAllUsers: ()=> dispatch(fetchAllUsers()),
    fetchAllConvos: () => dispatch(fetchAllConvos())
  }
}
  
export default connect(mapStateToProps, mapsToDispatchProps)(App);
