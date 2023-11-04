import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import Categories from './Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SearchProduct from './InputSearch';
import ProductsList from './ProductsList';
import LoadingPage from './LoadingPage';
import logo from '../images/logo.png';
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
      loading: false,
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

  isLoading = (param) => {
    this.setState({ loading: param });
  };

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
    this.setState({ loading: true });
    const products = await getProductsFromCategoryAndQuery(category, product);
    if (products.results.length > 0) {
      this.setState(() => ({
        productsDetails: products.results,
      }));
    }
    this.setState({ search: true, loading: false });
  };

  fSaveOnLocalStorage = () => {
    const { carProductList } = this.state;
    localStorage.setItem('carProductList', JSON.stringify(carProductList));
  };

  fAddProductToCar = (product) => {
    this.setState((prev) => ({
      carProductList: [...prev.carProductList, product],
    }), this.fSaveOnLocalStorage);
    const car = JSON.parse(localStorage.getItem('carProductList'));
    if (car) {
      this.setState({
        quanty: car.length + 1,
      });
    }
  };

  render() {
    const { productsDetails, search, category, quanty, loading } = this.state;
    console.log(quanty);
    return (
      <>
        <div className="header">
          <div>
            <SearchProduct
              handleClick={ this.handleClick }
            />
          </div>
          <div>
            <Link to="/online-store">
              {' '}
              <img src={ logo } alt="" />
            </Link>
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
              isLoading={ this.isLoading }
              category={ category }
              handleCategory={ this.handleCategory }
              productsDetail={ productsDetails }
              handleClick={ this.handleClick }
            />
          </div>

          <div className="products">
            {!loading && productsDetails && (
              <ProductsList
                productsDetails={ productsDetails }
                fAddProductToCar={ this.fAddProductToCar }
              />
            )}

            {loading && (<LoadingPage />)}

            { !search && !loading && (
              <p data-testid="home-initial-message" className="prod-parag Instrucao ">
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
