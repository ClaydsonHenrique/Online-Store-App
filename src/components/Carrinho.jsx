import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import arrowIcon from '../images/arrowIcon.svg';
import logo from '../images/logo.png';
import './Carrinho.css';

export default class Carrinho extends Component {
  state = {
    carProductList: [],
  };

  componentDidMount() {
    this.loadCar();
  }

  loadCar = () => {
    const car = JSON.parse(localStorage.getItem('carProductList'));
    if (!car) {
      localStorage.setItem('carProductList', JSON.stringify([]));
      return;
    }
    const carReduce = car.reduce((acc, prod) => {
      const soloProduct = car.filter((product) => (prod.id === product.id));
      console.log('solo', soloProduct);

      acc = [...acc, { product: soloProduct[0], quantity: soloProduct.length }];
      console.log('acc', acc);
      return acc;
    }, []);
    const parsedArray = carReduce.map((val) => JSON.stringify(val));
    console.log('parese', parsedArray);
    const carProductList = parsedArray.filter((value, ind) => (
      parsedArray.indexOf(value) === ind)).map((val) => JSON.parse(val));
    console.log('car', carProductList);
    this.setState(() => ({
      carProductList,
    }));
  };

  addLocalStorage = (product) => {
    const car = JSON.parse(localStorage.getItem('carProductList'));
    localStorage.setItem('carProductList', JSON.stringify([...car, product]));
  };

  addItem = (product) => {
    const { carProductList } = this.state;
    let indexProduct = 0;
    carProductList.forEach((prod, ind) => {
      if (prod.product.id === product.id) {
        indexProduct = ind;
      }
    });
    if (carProductList[indexProduct].quantity === product.available_quantity) {
      return;
    }
    this.addLocalStorage(product);
    this.setState((prevState) => ({
      carProductList: [...prevState.carProductList, product],
    }));
    this.loadCar();
  };

  updateLocalStorage = (newArr) => {
    localStorage.setItem('carProductList', JSON.stringify(newArr));
    this.loadCar();
  };

  removeItem = (removeId) => {
    const car = JSON.parse(localStorage.getItem('carProductList'));
    const newArrCarr = car.filter(({ id }) => id !== removeId);
    this.updateLocalStorage(newArrCarr);
  };

  decreaseItem = (indexProd, products) => {
    const { carProductList } = this.state;
    if (carProductList[indexProd].quantity === 1) {
      return;
    }
    const car = JSON.parse(localStorage.getItem('carProductList'));
    const filter = car.map(({ id }) => id);
    const removedItem = filter.lastIndexOf(products.id);
    const newArrCarr = car.filter((_arr, index) => index !== removedItem);
    this.updateLocalStorage(newArrCarr);
  };

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/Pagamento');
  };

  render() {
    const { carProductList } = this.state;
    return (
      <section>
        <div className="header">
          <Link to="/online-store">
            {' '}
            <img src={ logo } alt="" />
          </Link>
        </div>
        <div className="goHome">
          <Link to="/online-store">
            {' '}
            <img src={ arrowIcon } alt="" />
            {' '}
            Voltar
          </Link>
        </div>
        <section className="ProdutoCarrinho">
          {carProductList.length
            ? (
              <div className="lista-de-produtos">
                <ul>
                  {
                    carProductList.length
                      ? (
                        carProductList.map(({ product, quantity }, index) => (
                          <div key={ product.id }>
                            <li>
                              <h4
                                data-testid="shopping-cart-product-name"
                              >
                                {product.title}

                              </h4>
                              <p>{`R$ ${product.price}`}</p>
                              <div className="quantity">
                                <button
                                  onClick={ () => this.decreaseItem(index, product) }
                                  data-testid="product-decrease-quantity"
                                >
                                  -
                                </button>
                                <p
                                  data-testid="shopping-cart-product-quantity"
                                >
                                  {quantity}

                                </p>
                                <button
                                  onClick={ () => this.addItem(product) }
                                  data-testid="product-increase-quantity"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={ () => this.removeItem(product.id) }
                                data-testid="remove-product"
                              >
                                Remover

                              </button>
                            </li>

                          </div>
                        ))
                      )
                      : ''
                  }
                </ul>
                <section>
                  <div className="valor-total" />
                  <button
                    data-testid="checkout-products"
                    onClick={ this.handleSubmit }
                  >
                    Finalizar Compra

                  </button>
                </section>
              </div>
            )
            : <p className="Instrucao">Seu carrinho está vazio </p>}
        </section>
      </section>
    );
  }
}

Carrinho.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
