import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Product from './components/Product';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/product/:id" component={ Product } />
          <Route exact path="/Carrinho" component={ Carrinho } />

        </Switch>
      </div>
    );
  }
}

export default App;
