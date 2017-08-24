import React from 'react';
import AnimatedWrapper from "../../AnimatedWrapper";

/**
 * Each product's category
 * @return string
*/

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

/**
 * The single product
 * @return string
*/

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name} 
      </span>; // /
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr> // /
    );
  }
}

/**
 * The product's table
 * @return string
 * @uses <ProductCategoryRow>, <ProductRow>
*/

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;

    console.log(this.props.inStockOnly);
    
    this.props.products.forEach((product) => {
      /*
       This is how the filtering is done
       If the product is not stocked and the prop is inStockOnly
       or the the name does not match the filter's prop then return
      */
      if ( product.name.indexOf(this.props.filterText) === -1 || 
          (!product.stocked && this.props.inStockOnly)) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      // /
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
      // /
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

/**
 * The search bar
 * @return string
 *
*/

class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange    = this.handleInStockInputChange.bind(this);
  }
  
  // Handle the input changes
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  // Handle the stock switch
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <form>
        <input 
          type="text" 
          placeholder="Search..." 
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input 
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

/**
 * The product's table entire app
 * @return string
 * @uses <SearchBar>, <ProductTable>
*/

class FilterableProducts extends React.Component {

  // The initial states for filtering
  // and functions which will alter the state
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput    = this.handleInStockInput.bind(this);
  }

  // Changes the state
  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  // Changes the state
  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div className="filter">
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextInput={this.handleFilterTextInput}
            onInStockInput={this.handleInStockInput}
          />
          <ProductTable
            products={this.props.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
      </div> // /
    );
  }
}

//
// Data (demo for now)
//
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />, // /
//   document.getElementById('container')
// );

const FilterableProductTableComponent = () => (
    <FilterableProducts products={PRODUCTS} />
);

// Wrap the component in the AnimatedWrapper method
const FilterableProductTable = AnimatedWrapper(FilterableProductTableComponent);
export default FilterableProductTable;
