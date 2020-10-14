import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Component } from 'react';

firebase.initializeApp({
  authDomain: "oauth-management-baf39.web.app",
  apiKey: "AIzaSyCUFbALiC2K8RBxya1EiJZ6_UNXojq7Hb8"
})

class App extends Component{
  state = {isSignedIn: false}
  
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebase.auth.signInAnonymously.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:user})
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isSignedIn ? (
            <span>
              <div>SignedIn</div>
              <button onClick={() => firebase.auth().signOut()}>SignOut</button>
            </span>
          ) : (
            <StyledFirebaseAuth 
              uiConfig={this.uiConfig} 
              firebaseAuth={firebase.auth()}
            />
          )
        }
      </div>
    );
  }
}


export default App;


// https://console.developers.google.com/apis/credentials/oauthclient/${your_client_id}?project