import React, { Component } from "react";
import { Alert } from 'reactstrap';
import PropTypes from "prop-types";

import { FlashMessageType } from '../../helpers/AppHelper';

class FlashMessage extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
    this.onDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const { type, message } = this.props;
    return(
        <Alert color={FlashMessageType(type)} isOpen={this.state.visible} toggle={this.onDismiss}>
          { message || "I am an alert and I can be dismissed!" }
        </Alert>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default FlashMessage;
