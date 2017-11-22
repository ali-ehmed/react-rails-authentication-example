import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export const Login = ({isAuthenticated, onLogin}) => {
  return (
    isAuthenticated ? (
      <Redirect
        to={{
          pathname: '/',
          state: {
            flash: {
              type: 'info',
              message: 'You are already signed in.'
            }
          }
        }}
      />
    ) : (
      <div className="row justify-content-center">
        <div className="col-6">
          <h2 className="text-muted text-center">Sign In</h2>
          <Form onSubmit={(e) => onLogin(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" className="form-control" placeholder="Enter Email"/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Password</Label>
              <Input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </FormGroup>
            <FormGroup className="text-right">
              <Button color="success" outline>Sign In</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  )
};

export const Register = ({isAuthenticated, onRegister}) => {
  return (
    isAuthenticated ? (
      <Redirect
        to={{
          pathname: '/',
          state: {
            flash: {
              type: 'info',
              message: 'You are already signed in.'
            }
          }
        }}
      />
    ) : (
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h2 className="text-muted text-center">Sign Up</h2>
          <Form onSubmit={(e) => onRegister(e)}>
            <FormGroup>
              <Label for="email">Name</Label>
              <Input type="text" name="full_name" placeholder="Enter Your Name"/>
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" placeholder="Enter Your Username"/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" className="form-control" placeholder="Enter Email"/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Password</Label>
              <Input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Password Confirmation</Label>
              <Input type="password" name="password_confirmation" className="form-control" placeholder="Confirm Password"/>
            </FormGroup>
            <FormGroup className="text-right">
              <Button color="success" outline>Sign Up</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  )
};