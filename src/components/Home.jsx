import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import Categories from './Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SearchProduct from './InputSearch';
import ProductsList from './ProductsList';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      productsDetails: [],
      search: false,
      carProductList: [],
      quanty: [],
    };
  }

  componentDidMount() {
    const car = JSON.parse(localStorage.getItem('carProductList'));
    if (car) {
      this.setState({
        carProductList: car,
        quanty: car.length,
      });
    }
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

  fSaveOnLocalStorage = () => {
    const { carProductList } = this.state;
    localStorage.setItem('carProductList', JSON.stringify(carProductList));
  };

  fAddProductToCar = (product) => {
    this.setState((prev) => ({
      carProductList: [...prev.carProductList, product],
    }), this.fSaveOnLocalStorage);
  };

  render() {
    const { productsDetails, search, category, quanty } = this.state;
    return (
      <>
        <div className="header">
          <div>
            <SearchProduct
              handleClick={ this.handleClick }
            />
          </div>
          <Link
            to="/Carrinho"
            className="carrinho"
          >
            <BsFillCartFill className="carIcon" />
            <p className="quanty">{quanty}</p>
          </Link>
        </div>

        <div className="productCateg">
          <div className="category">
            <Categories
              category={ category }
              handleCategory={ this.handleCategory }
              productsDetail={ productsDetails }
              handleClick={ this.handleClick }
            />
          </div>
          <div className="products">
            <ProductsList
              productsDetails={ productsDetails }
              fAddProductToCar={ this.fAddProductToCar }
            />
            { !search && (
              <p data-testid="home-initial-message" className="prod-parag">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )}
            { search && productsDetails.length < 1
                && (<p className="prod-parag">Nenhum produto foi encontrado</p>)}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
