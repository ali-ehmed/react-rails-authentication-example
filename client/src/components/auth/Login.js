import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

const Login = ({isAuthenticated, onLogin}) => {
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
          <div>
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
      )
  )
};

export default Login;