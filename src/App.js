import React, { Component } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

injectTapEventPlugin();

 
class App extends Component {

  render() {
    return (
      <div className="App">
        <div> <Header/> </div>
        <MuiThemeProvider>
          <Content/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
