import React, { Component } from 'react';
import { connect } from 'react-redux';

// If user not authenticated render out to root
export default function (ComposedComponent) {
  class AuthenticateUser extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/', {
          flash: {
            type: 'alert',
            message: ('You need to sign in before continue.')
          }
        });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/', {
          flash: {
            type: 'alert',
            message: ('You need to sign in before continue.')
          }
        });
      }
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }

  return connect(mapStateToProps)(AuthenticateUser);
}