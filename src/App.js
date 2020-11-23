import React, { Component } from "react";
import { userList } from "./UserList";
import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      admin: false, //declaring admin as false to check it late by the user input
    };
  }

  nameHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  passwordHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submitHandler = (e) => {
    const { name, password } = this.state;
    /////////////////////////////////////////////////////////////
    let userRole = userList.find((user) => {
      return user.name === name && user.password === password;
    }).role; //finding the user and getting user's role(user or admin)
    ///////////////////////////////////////////////////////////
    if (userRole === "admin") {
      this.setState({
        admin: true,
      });
    } else {
      this.setState({
        admin: false,
      }); //if got userRole is admin state of admin is true else its is false
    }
    ////////////////////////////////////////////////////////////
    e.preventDefault();
  };

  render() {
    const { name, password, admin } = this.state;
    return (
      <div className="App">
        {admin ? ( //if admin is true than user details is rendered else login page is shown
          <>
            <h1>User Details</h1>
            <table id="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>MobileNumber</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {userList
                  .filter((user) => user.role === "user") //filtering only users
                  .map((user) => {
                    //entering user data
                    return (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.mobileNumber}</td>
                        <td>{user.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {" "}
            <h2>Login</h2>
            <form>
              <input
                id="username"
                value={name}
                name="username"
                placeholder="Username"
                onChange={this.nameHandler}
              />
              <input
                id="password"
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                onChange={this.passwordHandler}
              />
              <button id="login" onClick={this.submitHandler}>
                Login
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}
