import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Carrinho extends Component {
  state = {
    carProductList: [],
  };

  componentDidMount() {
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
  }

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
                  carProductList.map(({ product, quantity }) => (
                    <li key={ product.id }>
                      <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
                      <p>{`R$ ${product.price}`}</p>
                      <p data-testid="shopping-cart-product-quantity">{quantity}</p>
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
