import React, { Component } from "react";

import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import Parser from 'html-react-parser';

import { hideFlashMessage } from '../../actions/FlashMessagesAction';

import { Alert as BsNotifierAlert, AlertContainer } from "react-bs-notifier";

export const ALERT_NOTIFIER = 'alert_notifier';
export const ALERT_MESSAGE  = 'alert_message';

export class FlashAlertNotifier extends Component {
  constructor() {
    super();
    this.onDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss = () => {
    this.props.dispatch(hideFlashMessage(ALERT_NOTIFIER));
  }

  render() {
    return (
      <div>
        <AlertContainer position="top-right">
          {
            this.props.flash.visibleAlertNotifier ? (
              <BsNotifierAlert
                type={this.props.flash.flashType}
                headline={ this.props.flash.heading ?
                  Parser(this.props.flash.heading || '') : undefined
                }
                onDismiss={this.onDismiss}
                showIcon={true}
                timeout={4000}
              >
                { Parser(this.props.flash.message || '') }
              </BsNotifierAlert>
            ) : null
          }
        </AlertContainer>
      </div>
    )
  }
}

export class FlashAlertMessage extends Component {
  constructor() {
    super();
    this.onDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss = () => {
    this.props.dispatch(hideFlashMessage(ALERT_MESSAGE));
  };

  render() {
    return(
        <Alert
            className="flash-messages"
            color={this.props.flash.flashType}
            isOpen={this.props.flash.visibleAlertMessage}
            toggle={this.onDismiss}
        >
          { Parser(this.props.flash.message || '') }
        </Alert>
    );
  }
}

FlashAlertMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

FlashAlertNotifier.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};
