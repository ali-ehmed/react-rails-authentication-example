import { connect } from 'react-redux';

import { signIn, signUp } from "../actions/user";

import serialize from "form-serialize";

import { withRouter } from "react-router-dom";


const DeviseContainer = (DeviseComponent) => {
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
      },
      onRegister: (e) => {
        e.preventDefault();
        const form = e.target;
        const data = serialize(form, { hash: true });
        dispatch(signUp(data));
      },
    };
  };

  return withRouter(connect(mapStatesToProps, mapDispatchToProps)(DeviseComponent));
};

export default DeviseContainer;