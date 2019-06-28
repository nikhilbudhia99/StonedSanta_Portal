import React, { Component } from "react";
import { getFromStorage, setInStorage } from "./utils/storage.js";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNew from "./components/AppNew";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      siginInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: ""
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    console.log("check");
    console.log(obj);
    if (obj && obj.token) {
      //verify token
      const { token } = obj;
      fetch("http://localhost:5000/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  onTextboxChangeSignInEmail = event => {
    this.setState({
      signInEmail: event.target.value
    });
  };
  onTextboxChangeSignInPassword = event => {
    this.setState({
      signInPassword: event.target.value
    });
  };
  onTextboxChangeSignUpFirstName = event => {
    this.setState({
      signUpFirstName: event.target.value
    });
  };
  onTextboxChangeSignUpLastName = event => {
    this.setState({
      signUpLastName: event.target.value
    });
  };
  onTextboxChangeSignUpEmail = event => {
    this.setState({
      signUpEmail: event.target.value
    });
  };
  onTextboxChangeSignUpPassword = event => {
    this.setState({
      signUpPassword: event.target.value
    });
  };

  onSignUp = () => {
    //grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true
    });
    //post request to backend
    fetch("http://localhost:5000/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        eMail: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpFirstName: "",
            signUpLastName: "",
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  };

  onSignIn = () => {
    //grab state
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });
    //post request to backend
    fetch("http://localhost:5000/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eMail: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  };

  logout = () => {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      //verify token
      const { token } = obj;
      fetch("http://localhost:5000/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  };
  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <input
              type="text"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
          <br />
          <br />
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign in</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <AppNew />
        <button onClick={this.logout}>LOGOUT</button>
      </div>
    );
  }
}

export default App;
