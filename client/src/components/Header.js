import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/"> Redux Auth </Link>
        <Link to="/auth/signup"> Signup </Link>
        <Link to="/auth/signin"> Sign In</Link>
        <Link to="/auth/signout"> Sign Out</Link>
        <Link to="/">Feature</Link>
      </div>
    );
  }
}

export default Header;
