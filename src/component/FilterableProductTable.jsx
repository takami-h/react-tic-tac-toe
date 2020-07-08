import React from 'react';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function SearchBar(props) {
  return (
    <div className="search-bar">
      <input type="text" value={props.filterText}
        onChange={event => props.onFilterTextChange(event.target.value)} /><br/>
      <label>
        <input type="checkbox" checked={props.inStockOnly}
          onChange={event => props.onInStockOnlyChange(event.target.checked)} /> Only show products in stock
      </label>
    </div>
  );
}

function ProductCategoryRow(props) {
  return (
  <tr className="product-category-row" colSpan={2}>
    <th>{props.category}</th>
  </tr>
  );
}

function ProductRow(props) {
  return (
    <tr className={`product-row ${props.stocked ? 'stocked' : 'not-stocked'}`}>
      <td>{props.name}</td>
      <td>{props.price}</td>
    </tr>
  );
}

function ProductTable(props) {
  // [{ category: "Sporting Goods", products: [{}, {}...]}, {}...]
  const categories = [];
  props.products.reduce((categories, product) => {
    const category = categories.find(c => c.category === product.category);
    if (category) {
      category.products.push(product);
    } else {
      categories.push({
        category: product.category,
        products: [product],
      });
    }
    return categories;
  }, categories);
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th><th>Price</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => {
          return (
            <React.Fragment key={category.category}>
              <ProductCategoryRow key={category.category} category={category.category} />
              {category.products.map(product => {
                return (
                  <ProductRow key={product.name} name={product.name} price={product.price} stocked={product.stocked} />
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: '', inStockOnly: false};

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }
  handleFilterTextChange(text) {
    // HTTP GETして...
    this.setState({
      filterText: text
    });
  }
  handleInStockOnlyChange(inStockOnly) {
    // HTTP GETして...
    this.setState({
      inStockOnly
    });
  }
  render() {
    const filteredProducts = PRODUCTS.filter((p) => {
      return (!this.state.inStockOnly || p.stocked) && (p.name.match(RegExp(`.*${this.state.filterText}.*`)));
    });
    return (
      <div className="filterable-product-table">
        <h1>Product table - React Main Concepts / thinking in react</h1>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockOnlyChange={this.handleInStockOnlyChange} />
        <ProductTable products={filteredProducts} />
      </div>
    );
  }
}
