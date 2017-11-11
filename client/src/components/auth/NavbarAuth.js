import React, { Component } from 'react';

import {
  NavItem,
  NavDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import { NavLink as RouterNavLink } from 'react-router-dom';

class NavbarAuth extends Component {
  constructor() {
    super();
    this.dropDownToggle = this.dropDownToggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  dropDownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    let { isAuthenticated, user, onLogOut } = this.props;
    return (
        !isAuthenticated ? (
            [
              <NavItem key="login">
                <RouterNavLink to="/users/sign_in" activeClassName="active" className="nav-link">Login</RouterNavLink>
              </NavItem>,
              <NavItem key="register">
                <RouterNavLink to="/users/sign_up" activeClassName="active" className="nav-link">Register</RouterNavLink>
              </NavItem>
            ]
        ) : (
          [
            <NavItem key="login">
              <RouterNavLink to="/listings" activeClassName="active" className="nav-link">Discover</RouterNavLink>
            </NavItem>,
            <NavDropdown key="register" isOpen={this.state.dropdownOpen} toggle={this.dropDownToggle}>
              <DropdownToggle nav caret>
                { user.full_name }
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => onLogOut(e)}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
          ]
        )
    )
  }
}

export default NavbarAuth;