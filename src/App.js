import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Route, Switch, Router } from 'react-router-dom';

import { history } from './helpers';
import { Home } from './pages';

import './styles.scss';

const App = () => {
  return (
    <Router history={history}>
      <Home />
    </Router>
  );
};

export default App;