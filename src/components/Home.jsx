import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="./Carrinho" data-testid="shopping-cart-button"> Carrinho</Link>
      </div>
    );
  }
}

export default Home;
