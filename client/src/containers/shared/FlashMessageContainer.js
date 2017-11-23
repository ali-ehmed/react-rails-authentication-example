import React, { Component } from "react";
import { connect } from 'react-redux';

export default function (FlashMessageComponent) {
  class FlashMessageContainer extends Component {
    render() {
      return <FlashMessageComponent {...this.props} />;
    }
  }

  return connect((state) => {
    return {
      flash: state.flash
    };
  })(FlashMessageContainer);
}