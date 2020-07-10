import React, { useState, useReducer } from 'react';

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

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'changeFilterText':
      return {...state, filterText: action.value};
    case 'changeInStockOnly':
      return {...state, inStockOnly: action.value};
    default:
      return state;
  }
}
// Actions
const changeFilterTextAction = (text) => ({type: 'changeFilterText', value: text});
const changeInStockOnly = (inStockOnly) => ({type: 'changeInStockOnly', value: inStockOnly});

export function FilterableProductTable(props) {
  const [state, dispatch] = useReducer(reducer, {
    filterText: '',
    inStockOnly: false,
  });

  const filteredProducts = PRODUCTS.filter((p) => {
    return (!state.inStockOnly || p.stocked) && (p.name.match(RegExp(`.*${state.filterText}.*`)));
  });

  return (
  <div className="filterable-product-table">
    <h1>Product table - React Main Concepts / thinking in react</h1>
    <SearchBar filterText={state.filterText} inStockOnly={state.inStockOnly}
      onFilterTextChange={(text) => dispatch(changeFilterTextAction(text))}
      onInStockOnlyChange={(inStockOnly) => dispatch(changeInStockOnly(inStockOnly))} />
    <ProductTable products={filteredProducts} />
  </div>
  );
}
