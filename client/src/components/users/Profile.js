import React, { Component } from 'react';

import {
  Row, Col, Label,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input, Button
} from 'reactstrap';

import FlashMessage from '../shared/FlashMessage';
import { isEmpty } from '../../helpers/AppHelper';

import NoRouteMatch from '../NoRouteMatch';

import classnames from 'classnames';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: '1'
    };

    this.passwordFields = {};
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  resetPasswordFields() {
    if(!(isEmpty(this.passwordFields))) {
      Object.keys(this.passwordFields).map((key) => {
        this.passwordFields[key].value = "";
      })
    }
  }

  render() {
    let { current_user, onUpdate, errorMessages } = this.props;

    if(!errorMessages) {
      this.resetPasswordFields();
    }

    let errors = {
      flashType: 'danger',
      visible: true,
      message: "<h3 className='alert-heading'>Please Review Errors Below!</h3> " +  errorMessages,
      close: false
    };

    if(current_user.username !== this.props.match.params.username) {
      return <NoRouteMatch location={this.props.location} />;
    }

    return(
        <div>
          <div className="container-fluid">
            <Row>
              <div className="fb-profile">
                <img align="left" className="fb-image-lg" src="http://lorempixel.com/850/280/nightlife/5/" alt="Profile image example"/>
                <img align="left" className="fb-image-profile thumbnail" src="http://lorempixel.com/180/180/people/9/" alt="Profile image example"/>
                <div className="fb-profile-text">
                  <h1>{ current_user.full_name }</h1>
                </div>
              </div>
            </Row>
          </div>
          <div>
            {
              errorMessages ? (
                  <FlashMessage flash={errors} />
              ) : null
            }
            <Row>
              <Col md="8">
                <div data-spy="scroll" className="tabbable-panel">
                  <div className="tabbable-line">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggleTab('1'); }}
                        >
                          About Me
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggleTab('2'); }}
                        >
                          My Items
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <h4>Bio </h4>
                            <p>
                              My daughter  is good looking, with pleasant personality, smart, well educated, from well cultural and  a religious family background. having respect in heart for others.
                              would like to thanks you for visiting through my daughter;s profile.
                              She has done PG in Human Resources after her graduation.
                              At present working IN INSURANCE sector as Manager Training .
                            </p>
                            <h4>About her Family</h4>
                            <p>
                              About her family she belongs to a religious and a well cultural family background.
                              Father - Retired from a Co-operate Bank as a Manager.
                              Mother - she is a home maker.
                              1 younger brother - works for Life Insurance n manages cluster.
                            </p>
                            <h4>Education </h4>
                            <p>I have done PG in Human Resourses</p>
                            <h4>Occupation</h4>
                            <p>At present Working in Insurance sector</p>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <h3>My Items</h3>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <h4>Edit Profile</h4>
                <Form onSubmit={(e) => { onUpdate(e); }}>
                  <FormGroup>
                    <Label for="email">Name</Label>
                    <Input type="text" defaultValue={current_user.full_name} name="full_name" placeholder="Enter Your Name"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" defaultValue={current_user.username} name="username" placeholder="Enter Your Username"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" defaultValue={current_user.email} name="email" placeholder="Enter Email"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="current_password">Current Password</Label>
                    <Input innerRef={(input) => { this.passwordFields.currentPassword = input; }} type="password" name="current_password" placeholder="Enter your current password to save changes"/>
                  </FormGroup>
                  <FormGroup className="text-right">
                    <Button color="danger" outline>Save</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
    )
  }
}

export default Profile;