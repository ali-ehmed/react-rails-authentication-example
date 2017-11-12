import React, { Component } from "react";

import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import Parser from 'html-react-parser';

import { hideFlashMessage } from '../../actions/FlashMessagesAction';

class FlashMessage extends Component {
  constructor() {
    super();
    this.onDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss = () => {
    this.props.dispatch(hideFlashMessage());
  };

  render() {
    return(
        <Alert
            className="flash-messages"
            color={this.props.flash.flashType}
            isOpen={this.props.flash.visible}
            toggle={this.onDismiss}
        >
          { Parser(this.props.flash.message || '') }
        </Alert>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default FlashMessage;
