import { connect } from 'react-redux';

import { signIn } from "../actions/user";

import Login from "../components/auth/Login";

import serialize from "form-serialize";

import { withRouter } from "react-router-dom";

function mapStatesToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (e) => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(signIn(data));
    }
  }
};

const LoginContainer =  connect(mapStatesToProps, mapDispatchToProps)(Login);

export default withRouter(LoginContainer);