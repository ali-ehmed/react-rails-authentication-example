import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listings from '../components/Listings';

import { fetchListings } from '../actions/ListingsAction';

class ListingsContainer extends Component {
  componentWillMount() {
    if(!this.props.isFetching) {
      this.props.fetchListings();
    }
  }

  render() {
    return(
      <Listings {...this.props} />
    )
  }
}

function mapStatesToProps(state) {
  return {
    listings: state.listings.data,
    errorMessage: state.listings.errorMessage,
    isFetching: state.listings.isFetching,
    currentUser: state.user.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListings: () => dispatch(fetchListings())
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(ListingsContainer);