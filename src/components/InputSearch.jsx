import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export default class SearchProduct extends Component {
  state = {
    product: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { product } = this.state;
    const { handleClick } = this.props;
    return (
      <div className="containerInput">
        <input
          onChange={ this.onInputChange }
          name="product"
          className="query-input"
          placeholder="Digite o que você busca"
          value={ product }
        />
        <button
          className="query-button"
          onClick={ () => handleClick(product) }
        >
          <FaSearch className="iconSearch" />

        </button>
      </div>

    );
  }
}
SearchProduct.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
