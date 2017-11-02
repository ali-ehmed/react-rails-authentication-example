import React, { Component } from 'react';

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
import LoginContainer from '../containers/LoginContainer';

// HOC
import RequireAuth from '../hoc/RequireAuth'

// Helpers
import { isEmpty } from '../helpers/AppHelper';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flash: {}
    };
  };

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
            <Route path="/about_us" component={AboutUs}></Route>
            <Route path="/contact_us" component={Contact}></Route>
            <Route exact path="/users/sign_in" component={LoginContainer}></Route>
          </Switch>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
