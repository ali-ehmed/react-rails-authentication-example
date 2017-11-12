import React from 'react';

// React-Router
import {
  Link
} from 'react-router-dom';

import { Row, Col, Card, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';

import FilterListings from './Filters';

const renderItem = (match, item, currentUser) => {
  return (
    <Col key={item.id} md="4">
      <Card>
        <CardBody className="item-body">
          <CardTitle className="title">
            <Link to={`${match.url}/${item.id}`}>
              {item.name}
            </Link>
          </CardTitle>
          <CardSubtitle>{item.category}</CardSubtitle>
        </CardBody>
        <img width="100%" alt='' src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
        <CardBody className="item-body">
          <CardSubtitle>Price: <strong>{item.price}</strong></CardSubtitle>
          <hr/>
          <Link to={`${match.url}/${item.id}`} className="card-link btn btn-outline-info btn-sm">
            See Details
          </Link>
          <CardLink href="#" className="btn btn-outline-info btn-sm">View Designer</CardLink>
        </CardBody>
      </Card>
    </Col>
  );
};

export const Index = ({match, data, isFetching, currentUser, onFilter}) => {
  if(!(data instanceof Array)) {
    return null;
  }
  return (
    <div className="listings">
      {
        <div>
          <FilterListings onFilter={onFilter} />
          <hr/>
        </div>
      }

      {
        isFetching ? (
            <h2 className="text-muted text-center">Loading...</h2>
        ) : data.length === 0 ? (
            <h2 className="text-muted text-center">The List is empty</h2>
        ) : (
            <Row>
              { data.map((item) => renderItem(match, item, currentUser)) }
            </Row>
        )
      }
    </div>
  )
};

export const Show = ({data, currentUser}) => {
  return (
      <div className="listings">
        <h1>
          {data.name}
        </h1>
      </div>
  )
};