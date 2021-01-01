import React, { Component } from 'react';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCRmUcxzEp1h--gYJv0nfB_QHtjMQkXZMI",
   authDomain: "facebook-login-71c1a.firebaseapp.com",
   projectId: "facebook-login-71c1a",
   storageBucket: "facebook-login-71c1a.appspot.com",
   messagingSenderId: "543896888811",
   appId: "1:543896888811:web:63ea34248e3ae7b9a8e5ae",
   measurementId: "G-NGT11YC8HD"
})


class App extends Component {
  constructor(){
    super();
    this.state = {
      isLogIn:false,
      name:"",
      photo:""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = () =>{
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("user signed in");
        console.log(user)
        console.log(user.displayName +" " + user.photoURL);
        this.setState = ({
          isLogIn:true,
          name:user.displayName,
          photo:user.photoURL
        })

      } else {
        console.log("no user signed in");
      }
    });
  }
  render() {
    
    return (
      <div>
        
       { this.state.isLogIn === false ? 
       <button onClick = {this.onSubmit}>login with facebook</button>
       :
       <div>
         <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
       <img src ={this.state.photo}/>
       <p>{this.state.name}</p>
       <p></p>
       </div>

      }
        
    
        
      </div>
    ) 
  }
}

export default App
