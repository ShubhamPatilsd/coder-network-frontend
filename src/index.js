
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(


  <Router>
<Switch>
  <Route path="/login" component={Login}/>
  
  <Route path="/profile/:user" component={Profile}/>
    
  <Route path="/" component={Main}/>
    
  
  </Switch>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
