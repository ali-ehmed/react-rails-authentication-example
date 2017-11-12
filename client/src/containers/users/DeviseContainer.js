import { connect } from 'react-redux';

import { signIn, signUp } from "../../actions/UserAction";

import serialize from "form-serialize";

import { withRouter } from "react-router-dom";


const DeviseContainer = (DeviseComponent) => {
  function mapStatesToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }

  const mapDispatchToProps = (dispatch, state) => {
    return {
      onLogin: (e) => {
        e.preventDefault();
        const form = e.target;
        const data = serialize(form, { hash: true });
        dispatch(signIn(data, state.history));
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