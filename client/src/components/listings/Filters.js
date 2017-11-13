import React, { Component } from 'react';

import ReactBootstrapSlider from 'react-bootstrap-slider';

import {
  Row, Col,
  Card, CardBody,
  Collapse,
  Button,
  Form, FormGroup, Input, Label,
  Tooltip
} from 'reactstrap';

export default class FilterListings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExited = this.onExited.bind(this);
    this.state = {
      collapse: true,
      filterBtnText: 'Hide Filter',
      min_price: 1,
      max_price: 800
    };
  }

  onEntered() {
    this.setState({ filterBtnText: 'Hide Filter' });
  }

  onExited() {
    this.setState({ filterBtnText: 'Show Filter' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    let { onFilter } = this.props;
    return (
        <div>
          <Button style={{ marginBottom: '1rem' }} color="primary" className="btn btn-sm" onClick={this.toggle}>
            { this.state.filterBtnText }
          </Button>
          <Collapse
              isOpen={this.state.collapse}
              onEntered={this.onEntered}
              onExited={this.onExited}
          >
            <Card>
              <CardBody>
                <Form onSubmit={(e) => { onFilter(e); }}>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" className="form-control" placeholder="Search By Name"/>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Price</Label>
                        <Input type="hidden" name="price" value={this.state.min_price + ',' + this.state.max_price}/>
                        <ReactBootstrapSlider
                            className="listing-price-filter"
                            change={(e) => {
                              this.setState({
                                min_price: e.target.value[0], max_price: e.target.value[1]
                              }) ;
                            }}
                            value={[this.state.min_price, this.state.max_price]}
                            min={1}
                            max={800}
                            step={1}
                        />
                        <Row className="no-gutters">
                          <Col md="6">
                            <span className="price-labels">Min: ${this.state.min_price}</span>
                          </Col>
                          <Col md="6" className="text-right">
                            <span className="price-labels">Max: ${this.state.max_price}</span>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Category</Label>
                        <Input type="text" name="category" className="form-control" placeholder="Search By Category"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button color="success" outline>Filter</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Collapse>
        </div>
    )
  }
}