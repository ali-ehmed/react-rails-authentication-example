import { connect } from 'react-redux';

import { signIn, signUp, updateUser } from "../../actions/UserAction";

import serialize from "form-serialize";

import { withRouter } from "react-router-dom";


const DeviseContainer = (DeviseComponent) => {
  function mapStatesToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated,
      current_user: state.user.data,
      errorMessages: state.user.errorMessages
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
      onUpdate: (e) => {
        e.preventDefault();
        const form = e.target;
        const data = serialize(form, { hash: true });
        dispatch(updateUser(data));
      }
    };
  };

  return withRouter(connect(mapStatesToProps, mapDispatchToProps)(DeviseComponent));
};

export default DeviseContainer;