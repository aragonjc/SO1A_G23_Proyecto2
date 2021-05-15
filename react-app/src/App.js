import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './Home';
import Menu from './Menu';
import ShowData from './ShowData';
import SearchByCountry from './SearchByCountry';
import ByGender from './ByGender'
import TopVacunados from './TopVacunados'
import AllVaccinatedByCountry from './AllVaccinatedByCountry'
function App() {
  return (
    <Router>
    <Menu/>
      <Switch>
       <Route path='/' exact component={Home}/>
        <Route path='/data' exact component={ShowData} />
        <Route path='/vaccinatedBycountry' exact component={SearchByCountry} />
        <Route path='/bygender' exact component={ByGender} />
        <Route path='/masvacunados' exact component={TopVacunados} />
        <Route path='/AllVaccinatedByCountry' exact component={AllVaccinatedByCountry} />
      </Switch>
    </Router>
  );
}

export default App;
