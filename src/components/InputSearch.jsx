import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <>
        <input
          onChange={ this.onInputChange }
          name="product"
          className="query-input"
          value={ product }
        />
        <button
          className="query-button"
          onClick={ () => handleClick(product) }
        >
          Procurar

        </button>
      </>
    );
  }
}
SearchProduct.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
