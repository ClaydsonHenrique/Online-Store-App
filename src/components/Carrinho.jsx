import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Carrinho extends Component {
  render() {
    return (
      <section>
        <div>
          <Link to="./Home">Voltar</Link>
        </div>
        <div>
          <div className="lista-de-produtos">
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          </div>
          <div className="valor-total" />
        </div>
      </section>
    );
  }
}
