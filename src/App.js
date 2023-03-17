import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Home } />
        <Route path="/Carrinho" component={ Carrinho } />
      </div>
    );
  }
}

export default App;
