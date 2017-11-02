import React, { Component } from 'react';
import {
  Row, Col,
  Nav, NavItem,
} from 'reactstrap';
import { withRouter, NavLink as RouterNavLink } from 'react-router-dom';

import NavbarAuthContainer from '../../containers/NavbarAuthContainer';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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

                  <NavItem>
                    <RouterNavLink exact to="/contact_us" activeClassName="active" className="nav-link">Contact</RouterNavLink>
                  </NavItem>

                  <NavbarAuthContainer />
                </Nav>
              </Col>
            </Row>
          </header>
        </div>
    )
  }
}

export default withRouter(Navigation);
