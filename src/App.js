import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Product from './components/Product';
import Pagamento from './components/Pagamento';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/online-store" component={ Home } />
        <Route exact path="/product/:id" component={ Product } />
        <Route exact path="/Carrinho" component={ Carrinho } />
        <Route exact path="/Pagamento" component={ Pagamento } />

      </Switch>

    );
  }
}

export default App;
