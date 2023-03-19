import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  state = {
    allCategories: [],
  };

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
    handleCategory(id);
  };

  render() {
    const { allCategories } = this.state;
    return (
      <>
        {
          allCategories.map(({ name, id }) => (
            <label data-testid="category" htmlFor={ name } key={ name }>
              { name }
              <input
                onChange={ () => this.handleLoad(id) }
                name="category"
                type="radio"
                value={ name }
                id={ name }
              />
            </label>
          ))
        }
      </>
    );
  }
}
Categories.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};
