import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popular from './Popular'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/battle/results' component={Results} />
          <Route path='/popular' component={Popular} />
          <Route render={() => { return <p>Not Found</p> }} />
        </Switch>
      </div>
    </Router>
  );
};

App.PropTypes = {

};

export default App;