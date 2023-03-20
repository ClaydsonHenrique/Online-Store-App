import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagamento extends Component {
  state = {
    products: [],
    fullName: '',
    email: '',
    cpf: '',
    cell: '',
    cep: '',
    address: '',
    pagament: '',
    submited: false,
    validate: false,
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  getLocalStorage = () => {
    const product = JSON.parse(localStorage.getItem('carProductList'));

    this.setState({
      products: product,
    });
  };

  handleSubmit = (event) => {
    this.setState({
      submited: true,
    });
    event.preventDefault();
    const { history } = this.props;
    console.log(this.validateForm());
    if (this.validateForm()) {
      console.log('valido');
      localStorage.clear();
      history.push('/');
    }
  };

  validateForm = () => {
    const {
      fullName,
      email,
      cell,
      cep,
      cpf,
      address,
      pagament } = this.state;
    const valida = (
      fullName.length
             && email.length
              && cell.length
               && cep.length
                && cpf.length
                 && address.length
                && pagament.length > 0);
    return valida;
  };

  render() {
    const { products,
      fullName,
      email,
      cell,
      cep,
      cpf,
      address,
      submited,
      validate } = this.state;
    return (
      <div>
        <ul>
          {products.map((product) => (
            <li key={ product.id }>{product.title}</li>
          ))}

          <form onSubmit={ this.handleSubmit }>
            <input
              type="text"
              value={ fullName }
              name="fullName"
              id="fullName"
              data-testid="checkout-fullname"
              placeholder="Digite seu nome"
              onChange={ this.handleInput }
            />
            <input
              type="text"
              value={ email }
              name="email"
              id="email"
              data-testid="checkout-email"
              placeholder="Digite seu email"
              onChange={ this.handleInput }
            />
            <input
              type="text"
              value={ cpf }
              name="cpf"
              id="cpf"
              data-testid="checkout-cpf"
              placeholder="Digite seu CPF"
              onChange={ this.handleInput }
            />
            <input
              type="text"
              value={ cell }
              name="cell"
              id="cell"
              data-testid="checkout-phone"
              placeholder="Digite seu número de telefone"
              onChange={ this.handleInput }
            />
            <input
              type="text"
              value={ cep }
              name="cep"
              id="cep"
              data-testid="checkout-cep"
              placeholder="Digite seu CEP"
              onChange={ this.handleInput }
            />
            <input
              type="text"
              value={ address }
              name="address"
              id="address"
              data-testid="checkout-address"
              placeholder="Digite seu Endereço"
              onChange={ this.handleInput }
            />
            <input
              type="radio"
              name="pagament"
              id="boleto"
              data-testid="ticket-payment"
              value="boleto"
              onChange={ this.handleInput }

            />
            <input
              type="radio"
              name="pagament"
              id="visa"
              data-testid="visa-payment"
              value="visa"
              onChange={ this.handleInput }

            />
            <input
              type="radio"
              name="pagament"
              id="master"
              data-testid="master-payment"
              value="master"
              onChange={ this.handleInput }

            />
            <input
              type="radio"
              name="pagament"
              id="elo"
              data-testid="elo-payment"
              value="elo"
              onChange={ this.handleInput }

            />

            <button
              type="button"
              onClick={ this.handleSubmit }
              data-testid="checkout-btn"
            >
              Finalizar compra

            </button>
          </form>

        </ul>
        {!validate && submited && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

Pagamento.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Pagamento;
