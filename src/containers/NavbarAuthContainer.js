import { connect } from 'react-redux';
import NavbarAuth from '../components/auth/NavbarAuth';

import { signOut } from "../actions/user";

import { withRouter } from "react-router-dom";

function mapStatesToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.data
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOut: (e) => {
      e.preventDefault();
      dispatch(signOut(props));
    }
  }
};

const NavbarAuthContainer =  connect(mapStatesToProps, mapDispatchToProps)(NavbarAuth);

export default withRouter(NavbarAuthContainer);