import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'reactstrap';

import {
  Link
} from 'react-router-dom';

class CategoriesSelectComponent extends Component {
  render() {
    return (
        <div>
          <h3>Select Category</h3>
          <br/>
          <Row className="justify-content-md-center">
            <Col md="6">
              <ListGroup>
                <Link to={{
                  pathname: '/listings/new',
                  search: '?category=1'
                }}  className="list-group-item text-center">
                  Tops & Accessories
                </Link>
                <Link to={{
                  pathname: '/listings/new',
                  search: '?category=2'
                }}  className="list-group-item text-center">
                  Bottoms
                </Link>
                <Link to={{
                  pathname: '/listings/new',
                  search: '?category=3'
                }}  className="list-group-item text-center">
                  Shoes
                </Link>
              </ListGroup>
            </Col>
          </Row>
        </div>
    )
  }
}

export default CategoriesSelectComponent;