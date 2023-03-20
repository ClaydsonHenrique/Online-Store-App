import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductsList extends Component {
  render() {
    const { productsDetails, fAddProductToCar } = this.props;
    return (
      <div className="productList">
        { productsDetails && productsDetails?.map((product) => (
          <div data-testid="product" className="product" key={ product.id }>
            <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
              <h4>{ product.title }</h4>
              <p>{ `R$ ${product.price}`}</p>

            </Link>
            { product.shipping.free_shipping
              && <p data-testid="free-shipping">Frete grátis</p> }
            <button
              data-testid="product-add-to-cart"
              onClick={ () => { fAddProductToCar(product); } }
            >
              Adicionar ao carrinho

            </button>
          </div>))}
      </div>
    );
  }
}
ProductsList.propTypes = {
  productsDetails: PropTypes.arrayOf(PropTypes.shape),
  fAddProductToCar: PropTypes.func.isRequired,
};
ProductsList.defaultProps = {
  productsDetails: [],
};
