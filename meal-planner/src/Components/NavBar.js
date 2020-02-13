import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import Generate from './Generate';


class NavBar extends Component {
    showSettings (event) {
      event.preventDefault();
    }


    render() {
        return (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <Menu>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
                </Menu>
              <Link className="navbar-brand" to="/">
                Logo
              </Link>
              <Generate />
              
            </nav>
        );
    }
}     
  



    

export default NavBar;