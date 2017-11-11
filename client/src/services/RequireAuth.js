import authWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import redirectHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import Redirect from 'redux-auth-wrapper/redirect';
import { withProps } from 'recompose';

const redirectHelper = redirectHelperBuilder({});

const createRedirect = (allowRedirectBack, history) => (...args) => {
  const redirectLoc = redirectHelper.createRedirectLoc(allowRedirectBack)(...args)
  history.push(redirectLoc, {
    flash: {
      type: 'alert',
      message:'You need to sign in before continue.'
    }
  });
}

const AuthFailureRedirect = withProps((props) => ({
  redirectPath: '/users/sign_in',
  redirect: createRedirect(true, props.history)
}))(Redirect);

export const userIsAuthenticated = authWrapper({
  authenticatedSelector: state => {
    return state.user.isAuthenticated;
  },
  authenticatingSelector: state => state.user.isFetching,
  FailureComponent: AuthFailureRedirect,
  wrapperDisplayName: 'UserIsAuthenticated'
});

export default userIsAuthenticated;

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
// // If user not authenticated render out to root
// export default function (ComposedComponent) {
//   class AuthenticateUser extends Component {
//     componentWillMount() {
//       setTimeout(() => {
//         if (!this.props.isAuthenticated) {
//           this.props.history.push({
//             pathname: '/users/sign_in',
//             search: '?referrer=' + this.props.history.location.pathname
//           }, {
//             flash: {
//               type: 'alert',
//               message:'You need to sign in before continue.'
//             }
//           });
//         }
//       }, 100);
//
//     }
//
//     render() {
//       if (!this.props.isAuthenticated) {
//         return null;
//       }
//       return <ComposedComponent/>;
//
//     }
//   }
//
//   return connect((state) => {
//     return {
//       isAuthenticated: state.user.isAuthenticated
//     };
//   })(AuthenticateUser);
// }