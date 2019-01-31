import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

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
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
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
            <div className="container">
              <Grid>
                <Row>
                  <Col md={2} mdPush={5}>
                    <h3>Liberry</h3>
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In To Continue
                  </Button>
                  </Col>
                </Row>
              </Grid>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
