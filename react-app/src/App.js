import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Menu from './Menu';
import ShowData from './ShowData';

function App() {
  return (
    <Router>
    <Menu/>
      <Switch>
        <Route path='/data' exact component={ShowData} />
      
      </Switch>
    </Router>
  );
}

export default App;
