import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import Landing from './components/landing';
import Editor from './components/editor';
import Export from './components/export'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Landing} />
          <Route path="/editor" component={Editor} />
          <Route path="/export" component={Editor} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
