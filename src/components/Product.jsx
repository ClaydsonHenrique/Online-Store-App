import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
  }

  handleSubmit = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push('/Carrinho');
  };

  fetchProductDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  };

  render() {
    const { product } = this.state;
    return (
      <div className="product">
        <Link to="/Carrinho" data-testid="shopping-cart-button"> Carrinho</Link>
        <p data-testid="product-detail-name">{product.title}</p>
        <img src={ product.thumbnail } alt="" data-testid="product-detail-image" />
        <p data-testid="product-detail-price">{product.price}</p>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.handleSubmit }
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Product;
