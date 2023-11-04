import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import logo from '../images/logo.png';
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
      quanty: 0,
      images: [],
      atributos: [],
      imgIndex: 0,
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
    this.setState({ quanty: getLocal.length + 1 });
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
    const { images } = this.state;
    const AllImages = response.pictures;
    const AllAtributes = response.attributes;
    this.setState({ atributos: AllAtributes });
    AllImages.map((img) => images.push(img.url));
  };

  handleImagesSlide = (id) => {
    this.setState({ imgIndex: id });
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
      quanty,
      images,
      atributos,
      imgIndex,
    } = this.state;
    console.log(atributos);
    return (
      <main className="mainPage">
        <div className="header">
          <Link to="/online-store">
            {' '}
            <img src={ logo } alt="" />
          </Link>
          <Link
            to="/Carrinho"
            className="carrinho"
          >
            <BsFillCartFill className="carIcon" />
            <p className="quanty">{quanty}</p>
          </Link>
        </div>
        <div className="ContainerProduct">
          <section className="a">
            <div className="flexProduct1">
              <p data-testid="product-detail-name">{product.title}</p>
              <img src={ images[imgIndex] } alt="" data-testid="product-detail-image" />
            </div>
          </section>
          <section className="flexProduct2">
            <h1>Especiicações tecnicas</h1>
            <ul>
              {atributos.slice(0, 15).map((atributo, index) => (
                <li key={ index }>
                  {`${atributo.name} : ${atributo.value_name}`}
                </li>
              ))}
            </ul>
            <p data-testid="product-detail-price">{product.price}</p>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ () => { this.fTest(product); } }
            >
              Adicionar ao Carrinho

            </button>
          </section>

        </div>
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
              const returnFromLocal = JSON.parse(localStorage.getItem(params.id)
                || '[]');
              console.log(returnFromLocal);
              returnFromLocal.push(ratingObj);
              localStorage.setItem(params.id, JSON.stringify(returnFromLocal));
              this.setState((prev) => ({
                ratings: [...prev.ratings, ratingObj],
                emailInput: '',
                rating: 0,
                mensagem: '',
                trigger: false,
              }));
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
      </main>
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
