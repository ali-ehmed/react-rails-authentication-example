import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from "form-serialize";

import { fetchListingData } from '../../actions/ListingsAction';

export default function (ActionComponent) {
  class ListingsContainer extends Component {
    componentWillMount() {
      if(!this.props.isFetching) {
        let action = 'listings';
        if (ActionComponent.name === 'Show') {
          action += '/' + this.props.match.params.id;
        }
        this.props.fetchListings(action);
      }
    }

    render() {
      return(
          <ActionComponent {...this.props} />
      )
    }
  }

  function mapStatesToProps(state) {
    return {
      data: state.listings.data,
      errorMessage: state.listings.errorMessage,
      isFetching: state.listings.isFetching,
      currentUser: state.user.data
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchListings: (action) => dispatch(fetchListingData(action)),
      onFilter: (e) => {
        e.preventDefault();
        const form = e.target;
        const data = serialize(form, { hash: true });
        dispatch(fetchListingData('listings', data))
      }
    }
  };

  return connect(mapStatesToProps, mapDispatchToProps)(ListingsContainer);
};