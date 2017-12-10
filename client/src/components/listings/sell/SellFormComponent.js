import React, { Component } from 'react';
import CategoriesSelectComponent from './CategoriesSelectComponent';

import { getParams } from '../../../helpers/AppHelper';

// import { Row, Col, Card, CardBody, CardLink,
  // CardTitle, CardSubtitle } from 'reactstrap';

class SellFormComponent extends Component {
  render() {
    if(!getParams(this.props.location.search).category) {
      return <CategoriesSelectComponent />
    }

    return (
        <h3>Sell You Item</h3>
    )
  }
}

export default SellFormComponent;