import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './Home';
import Menu from './Menu';
import ShowData from './ShowData';
import SearchByCountry from './SearchByCountry';

function App() {
  return (
    <Router>
    <Menu/>
      <Switch>
       <Route path='/' exact component={Home}/>
        <Route path='/data' exact component={ShowData} />
        <Route path='/vaccinatedBycountry' exact component={SearchByCountry} />
      </Switch>
    </Router>
  );
}

export default App;
