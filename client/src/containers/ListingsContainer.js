import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listings from '../components/Listings';

import { fetchListings } from '../actions/listings';

class ListingsContainer extends Component {
  componentWillMount() {
    this.props.fetchListings();
  }

  render() {
    return(
      <Listings {...this.props} />
    )
  }
}

function mapStatesToProps(state) {
  console.log(state)
  return {
    listings: state.listings.data,
    errorMessage: state.listings.errorMessage,
    currentUser: state.user.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListings: () => dispatch(fetchListings())
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(ListingsContainer);