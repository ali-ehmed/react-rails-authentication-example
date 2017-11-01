import React, { Component } from 'react';
import {
  Row, Col,
  Nav, NavItem, NavLink} from 'reactstrap';
import { withRouter, NavLink as RouterNavLink } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.dropDownToggle = this.dropDownToggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropDownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return(
        <div>
          <header className="nav-header clearfix">
            <Row>
              <Col md="6" xs="12">
                <RouterNavLink exact to="/" activeClassName="active" className="navbar-brand">
                  <h3 className="text-muted">Market Place</h3>
                </RouterNavLink>
              </Col>
              <Col md="6" xs="12">
                <Nav pills className="justify-content-end">
                  <NavItem>
                    <RouterNavLink exact to="/about_us" activeClassName="active" className="nav-link">About Us</RouterNavLink>
                  </NavItem>
                  {/*<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.dropDownToggle}>*/}
                  {/*<DropdownToggle nav caret>*/}
                  {/*Dropdown*/}
                  {/*</DropdownToggle>*/}
                  {/*<DropdownMenu>*/}
                  {/*<DropdownItem header>Header</DropdownItem>*/}
                  {/*<DropdownItem disabled>Action</DropdownItem>*/}
                  {/*<DropdownItem>Another Action</DropdownItem>*/}
                  {/*<DropdownItem divider />*/}
                  {/*<DropdownItem>Another Action</DropdownItem>*/}
                  {/*</DropdownMenu>*/}
                  {/*</NavDropdown>*/}
                  <NavItem>
                    <RouterNavLink exact to="/contact_us" activeClassName="active" className="nav-link">Contact</RouterNavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </header>
        </div>
    )
  }
}

export default withRouter(Navigation);
