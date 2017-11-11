import React, { Component } from 'react';
import { connect } from 'react-redux';

// React-Router
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

// Components
import Navigation from './shared/Navigation';
import FlashMessageContainer from '../containers/FlashMessageContainer';
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import { Login, Register }from "../components/auth/Devise";
import DeviseContainer from '../containers/DeviseContainer';
import ListingsContainer from '../containers/ListingsContainer';

// Services
import UserIsAuthenticated from '../services/RequireAuth';

// Helpers
import { showFlashMessage } from '../actions/flashMessageAction';
import { hideFlashMessage } from '../actions/flashMessageAction';

// Action Creator
import { verifyServerAuthentication } from '../actions/userAction';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flash: {}
    };
  };

  componentDidMount() {
    this.props.verifyServerAuthentication();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if(typeof this.props.location.state === 'object') {
        this.props.showFlashMessage();
      } else {
        this.props.hideFlashMessage();
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <Navigation />
          <FlashMessageContainer />

          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about_us" component={UserIsAuthenticated(AboutUs)}></Route>
            <Route path="/contact_us" component={Contact}></Route>
            <Route path="/listings" component={UserIsAuthenticated(ListingsContainer)}></Route>
            <Route exact path="/users/sign_in" component={DeviseContainer(Login)}></Route>
            <Route exact path="/users/sign_up" component={DeviseContainer(Register)}></Route>
          </Switch>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

function mapStatesToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    verifyServerAuthentication: () => dispatch(verifyServerAuthentication()),
    showFlashMessage: () => dispatch(showFlashMessage(
        state.location.state.flash.type,
        state.location.state.flash.title || '',
        state.location.state.flash.message
    )),
    hideFlashMessage: () => dispatch(hideFlashMessage())
  }
};

export default (
    withRouter(connect(mapStatesToProps, mapDispatchToProps)(App))
);
