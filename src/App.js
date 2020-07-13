import React from 'react';
import logo from './assets/logo.png';
import './styles/App.css';

class App extends React.Component{
  render(){
      return (
        <div>
          <header className="App-header">
            <img src={logo} alt="logo" />
            <a
              className="App-link"
              href="https://mygenericshop.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit MyGOS
            </a>
          </header> 
        </div>
      );
  }
}

export default App;
