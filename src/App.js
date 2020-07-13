import React from 'react';
import logo from './assets/logo.png';
import './styles/App.css';
import {Container} from 'react-bootstrap';
import Stock from './Stock';

class App extends React.Component{
  render(){
      return (
        <Container>
          <header className="App-header">
            <img src={logo} alt="logo" />
            <a
              className="App-link"
              href="https://mygenericshop.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Visit MyGOS</h2>
            </a>
            <br/>
          </header>
          <Stock></Stock>
        </Container>
      );
  }
}

export default App;
