import React, { Component } from 'react';
import { connect } from 'react-redux';

// If user not authenticated render out to root

class AuthenticateUser extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/', {
          flash: {
            type: 'danger',
            message: (this.props.message || 'You need to sign in before continue.')
          }
        });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/', {
          flash: {
            type: 'danger',
            message: (this.props.message || 'You need to sign in before continue.')
          }
        });
      }
    }

    render() {
      // return <{this.props.component} {...this.props} />;
      let ComposedComponent = this.props.component;
      return <ComposedComponent {...this.props}/>;
    }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

export default connect(mapStateToProps)(AuthenticateUser);