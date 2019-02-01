import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Berry from './images/grapes.png';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (

      <div>
        <Navbar style={{ 'border-radius':'0px', 'margin-bottom':'0px' }} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand style={{ 'margin-top': '5px' }}>
              Liberry
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={3} href="#">
                {
                  !isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                  </Button>
                  )
                }
                {
                  isAuthenticated() && (
                    <Button
                      bsStyle="danger"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                  </Button>
                  )
                }
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          !isAuthenticated() && (
            <div>
              <Container style={{
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'text-align': 'center',
                'padding-top': '100px'
              }}>
                <img src={Berry} alt="berry" />
                <br />
                <h1>Welcome to Liberry! A personal library database for you to store your collection of books and to keep track of books that you are currently missing.</h1>
                <img src={Berry} alt="berry" />
              </Container>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
