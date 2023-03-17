import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductsList extends Component {
  render() {
    const { productsDetails } = this.props;
    return (
      <div>
        { productsDetails && productsDetails?.map((product) => (
          <div data-testid="product" key={ product.id }>
            <h4>{ product.title }</h4>
            <p>{ `R$ ${product.price}`}</p>
          </div>))}
      </div>
    );
  }
}
ProductsList.propTypes = {
  productsDetails: PropTypes.arrayOf(PropTypes.shape),
};
ProductsList.defaultProps = {
  productsDetails: [],
};
