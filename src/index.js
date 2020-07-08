import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Game } from './component/Game';

import { StrongBlock } from './component/StrongBlock';
import { Clock } from './component/Clock';
import { ShoppingList } from './component/ShoppingList';
import { EssayForm } from './component/EssayForm';

import { FilterableProductTable } from './component/FilterableProductTable';

const itemsToBuy = ['Instagram', 'WhatsApp', 'Oculus', 'Parse'];

ReactDOM.render(
  <main>
    <Game />
    <hr />
    <ShoppingList name="John Doe" items={itemsToBuy} />
    <hr />
    <h1>Clock - React Main Concepts / state and lifecycle</h1>
    <StrongBlock>
      <Clock interval={1000} />
    </StrongBlock>
    <StrongBlock>
      <Clock interval={2000} />
    </StrongBlock>
    <StrongBlock>
      <Clock interval={3000} />
    </StrongBlock>
    <hr />
    <EssayForm />
    <hr />
    <FilterableProductTable />
  </main>,
  document.getElementById('root')
);
