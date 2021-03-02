import React from 'react';
import { Router } from 'react-router-dom';

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