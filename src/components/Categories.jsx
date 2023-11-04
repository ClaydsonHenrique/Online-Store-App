import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      allCategories: [],
      checked: '',
    };
  }

  componentDidMount() {
    this.fGetCategories();
  }

  fGetCategories = async () => {
    const data = await getCategories();
    this.setState((prev) => ({
      allCategories: [...prev.allCategories, ...data],
    }));
  };

  handleLoad = (id) => {
    const { handleCategory } = this.props;
    this.setState({ checked: id });
    handleCategory(id);
  };

  render() {
    const { allCategories, checked } = this.state;
    return (
      <section className="containerCategoria">
        <h2>Categorias</h2>
        {
          allCategories.map(({ name, id }) => (
            <div key={ id }>
              <button
                onClick={ () => this.handleLoad(id) }
                name="category"
                id={ name }
                className={ `produtoCaterogia ${checked === id ? 'check' : ''} ` }
              >
                {name}

              </button>
            </div>
          ))
        }
      </section>
    );
  }
}
Categories.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};
