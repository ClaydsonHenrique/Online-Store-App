import React, { Component } from 'react';

export default class loadingPage extends Component {
  render() {
    return (
      <div className="containerLoading">
        <h1>Carregando...</h1>
        <div className="Loading" />
      </div>
    );
  }
}
