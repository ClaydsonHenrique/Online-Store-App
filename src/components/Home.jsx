import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SearchProduct from './InputSearch';
import ProductsList from './ProductsList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      productsDetails: [],
      search: false,
    };
  }

  handleCategory = (categ) => {
    this.setState({
      category: categ,
    }, this.handleClick);
  };

  handleClick = async (product) => {
    if (!product) {
      product = '';
    }
    const { category } = this.state;
    const products = await getProductsFromCategoryAndQuery(category, product);
    if (products.results.length > 0) {
      this.setState(() => ({
        productsDetails: products.results,
      }));
    }
    this.setState({ search: true });
  };

  render() {
    const { productsDetails, search, category } = this.state;
    return (
      <>
        <div>
          <SearchProduct
            handleClick={ this.handleClick }
          />
          { !search && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <Link to="./Carrinho" data-testid="shopping-cart-button"> Carrinho</Link>
        <div>
          <Categories
            category={ category }
            handleCategory={ this.handleCategory }
            productsDetail={ productsDetails }
            handleClick={ this.handleClick }
          />
          { search && productsDetails.length < 1
          && (<p>Nenhum produto foi encontrado</p>)}
          <ProductsList productsDetails={ productsDetails } />
        </div>
      </>
    );
  }
}

export default Home;
