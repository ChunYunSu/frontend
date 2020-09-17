import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header';
import App from './App';
import TodoItems from './todoItem';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <Header topic="TODO" subtopic="A Simple todolist built react hooks & context" />
    <TodoItems />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
