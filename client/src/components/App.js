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
import FlashMessage from './shared/FlashMessage';
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import { Login, Register }from "../components/auth/Devise";
import DeviseContainer from '../containers/DeviseContainer';
import ListingsContainer from '../containers/ListingsContainer';

// HOC
import UserIsAuthenticated from '../hoc/RequireAuth';

// Helpers
import { isEmpty } from '../helpers/AppHelper';

// Action Creator
import { verifyServerAuthentication } from '../actions/user';

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
        this.setState({ flash: this.props.location.state.flash });
      } else {
        this.setState({ flash: {} });
      }
    }
  };

  renderFlashMessages = (flash) => {
    if(!isEmpty(flash)) {
      return(
          <FlashMessage type={flash.type} message={flash.message} flashState={this} />
      )
    }
  };

  render() {
    const flashMessages = this.renderFlashMessages(this.state.flash);
    return (
      <div>
        <div className="container">
          <Navigation />
          { flashMessages }

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

const mapDispatchToProps = (dispatch) => {
  return {
    verifyServerAuthentication: () => dispatch(verifyServerAuthentication())
  }
};

export default (withRouter(connect(mapStatesToProps, mapDispatchToProps)(App)));
