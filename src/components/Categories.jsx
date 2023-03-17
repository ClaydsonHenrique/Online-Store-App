import React, { Component } from 'react';
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

  render() {
    const { allCategories } = this.state;
    return (
      <div>
        {
          allCategories.map(({ name }) => (
            <label data-testid="category" htmlFor={ name } key={ name }>
              { name }
              <input
                type="radio"
                value={ name }
                id={ name }
              />
            </label>
          ))
        }
      </div>
    );
  }
}
