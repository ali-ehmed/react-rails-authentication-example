import React from 'react';

import { Row, Col, Card, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';

const renderItem = (item, currentUser) => {
  return (
    <Col key={item.id} md="4">
      <Card>
        <CardBody>
          <CardTitle className="title">
            <a href="/listings">{item.name}</a>
          </CardTitle>
          <CardSubtitle>{item.category}</CardSubtitle>
        </CardBody>
        <img width="100%" alt='' src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
        <CardBody>
          <CardSubtitle>Price: <strong>{item.price}</strong></CardSubtitle>
          <hr/>
          <CardLink href="#" className="btn btn-outline-info btn-sm">See Details</CardLink>
          <CardLink href="#" className="btn btn-outline-info btn-sm">View Designer</CardLink>
        </CardBody>
      </Card>
    </Col>
  );
};

const Listings = ({listings, errorMessage, currentUser}) => {
  return (
    <div className="listings">
      {
        errorMessage ? (
          <h2 className="text-muted text-center">{errorMessage}</h2>
        ) : (
          <Row>
            {
              listings === undefined || listings.length === 0 ? (
                  <h2 className="text-muted text-center">The List is empty</h2>
              ) : (
                  listings.map((item) => renderItem(item, currentUser))
              )
            }
          </Row>
        )
      }

    </div>
  )
};

export default Listings;