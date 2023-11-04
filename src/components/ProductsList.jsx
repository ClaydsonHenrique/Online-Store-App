import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductList.css';

export default class ProductsList extends Component {
  render() {
    const { productsDetails, fAddProductToCar } = this.props;
    return (
      <div className="productList">
        { productsDetails && productsDetails?.map((product) => (
          <div data-testid="product" className="product" key={ product.id }>
            <Link className="linkContainer" to={ `/product/${product.id}` }>
              <img src={ product.thumbnail } alt="" className="imageProduct" />
              <h4 className="productTitle">{ product.title }</h4>
            </Link>
            <p className="price">{ `R$ ${product.price}`}</p>
            { product.shipping.free_shipping
              && <p className="free-shipping">Frete grátis!</p> }
            <button
              className="product-add-to-cart"
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
