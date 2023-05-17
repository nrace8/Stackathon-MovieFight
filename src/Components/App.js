import React from 'react';
import MovieFight from './MovieFight.js';
import Header from './Header';
import 'bulma/css/bulma.min.css';

const App = ()=> {

  return (
    <div>
      <Header />
      { <MovieFight /> }
    </div>
  );
};

export default App;
