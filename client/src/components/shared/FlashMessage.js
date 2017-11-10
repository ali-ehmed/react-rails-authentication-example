import React, { Component } from "react";
import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import Parser from 'html-react-parser';

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

    // Clearing App Component Flash State on Alert Dismiss
    this.props.flashState.setState({ flash: {} });
  };

  render() {
    const { type, message } = this.props;
    return(
        <Alert color={FlashMessageType(type)} isOpen={this.state.visible} toggle={this.onDismiss}>
          { Parser(message) || "I am an alert and I can be dismissed!" }
        </Alert>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default FlashMessage;
