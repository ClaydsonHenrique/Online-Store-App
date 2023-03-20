import { Component } from 'react';
import { Link } from 'react-router-dom';
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

      acc = [...acc, { product: soloProduct[0], quantity: soloProduct.length }];
      return acc;
    }, []);
    const parsedArray = carReduce.map((val) => JSON.stringify(val));
    const carProductList = parsedArray.filter((value, ind) => (
      parsedArray.indexOf(value) === ind)).map((val) => JSON.parse(val));
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

  render() {
    const { carProductList } = this.state;
    return (
      <section>
        <div>
          <Link to="/">Voltar</Link>
        </div>

        <div className="lista-de-produtos">
          <ul>
            {
              carProductList.length
                ? (
                  carProductList.map(({ product, quantity }, index) => (
                    <li key={ product.id }>
                      <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
                      <p>{`R$ ${product.price}`}</p>
                      <div className="quantity">
                        <button
                          onClick={ () => this.decreaseItem(index, product) }
                          data-testid="product-decrease-quantity"
                        >
                          -
                        </button>
                        <p data-testid="shopping-cart-product-quantity">{quantity}</p>
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
                  ))
                )
                : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            }
          </ul>

          <div className="valor-total" />
        </div>
      </section>
    );
  }
}
