import React, { Component } from "react";
import Nav from "./NavBar";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Nav />
        <h1>Posts</h1>
      </>
    );
  }
}

export default Posts;
