import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      emailInput: '',
      rating: 0,
      mensagem: '',
      trigger: false,
      ratings: [],
    };
  }

  componentDidMount() {
    const getLocal = JSON.parse(localStorage.getItem('carProductList'));
    if (!getLocal) {
      localStorage.setItem('carProductList', JSON.stringify([]));
    }
    this.fetchProductDetails();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleValidation = () => {
    const { emailInput, rating } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailRegex.test(emailInput) && rating > 0;
  };

  fTest = (product) => {
    const getLocal = JSON.parse(localStorage.getItem('carProductList'));
    localStorage.setItem('carProductList', JSON.stringify([...getLocal, product]));
  };

  fetchProductDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getProductById(id);
    const localStorageById = JSON.parse(localStorage.getItem(id) || '[]');
    this.setState({
      product: response,
      ratings: localStorageById,
    });
  };

  render() {
    const cinco = 5;
    const {
      product,
      emailInput,
      rating,
      mensagem,
      trigger,
      ratings,
    } = this.state;
    return (
      <div className="product">
        <Link to="/Carrinho" data-testid="shopping-cart-button"> Carrinho</Link>
        <p data-testid="product-detail-name">{product.title}</p>
        <img src={ product.thumbnail } alt="" data-testid="product-detail-image" />
        <p data-testid="product-detail-price">{product.price}</p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => { this.fTest(product); } }
        >
          Adicionar ao Carrinho

        </button>

        <input
          type="email"
          name="emailInput"
          value={ emailInput }
          data-testid="product-detail-email"
          onChange={ this.handleChange }
        />
        {[...Array(cinco)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-rating` }
              className={ index <= rating ? 'on' : 'off' }
              onClick={ () => {
                this.setState({ rating: index });
              } }
            >
              <span className="star">&#9733;</span>

            </button>
          );
        })}
        <p>{rating}</p>
        <textarea
          name="mensagem"
          id=""
          cols="30"
          rows="10"
          data-testid="product-detail-evaluation"
          onChange={ this.handleChange }
          value={ mensagem }
        />
        <button
          data-testid="submit-review-btn"
          onClick={ () => {
            if (this.handleValidation()) {
              const { match: { params } } = this.props;
              const ratingObj = { email: emailInput, rating, text: mensagem };
              const returnFromLocal = JSON.parse(localStorage.getItem(params.id) || '[]');
              console.log(returnFromLocal);
              returnFromLocal.push(ratingObj);
              localStorage.setItem(params.id, JSON.stringify(returnFromLocal));
              this.setState((prev) => ({ ratings: [...prev.ratings, ratingObj],
                emailInput: '',
                rating: 0,
                mensagem: '',
                trigger: false }));
            } else {
              this.setState({ trigger: true });
            }
          } }
        >
          Enviar

        </button>
        {!this.handleValidation() && trigger && (
          <p
            data-testid="error-msg"
          >
            Campos inválidos

          </p>)}
        {ratings.map((evaluation) => (
          <div key={ evaluation.email }>
            <p data-testid="review-card-email">{evaluation.email}</p>
            <div data-testid="review-card-rating">{evaluation.rating}</div>
            <span data-testid="review-card-evaluation">{evaluation.text}</span>
          </div>))}
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
