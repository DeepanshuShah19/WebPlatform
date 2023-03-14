import React, { Component } from "react";
import Nav from "./NavBar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Nav />
        <div>
          <h1>Profile</h1>
        </div>
      </>
    );
  }
}

export default Profile;
