import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Peoples from './People';

export var client;

class Home extends Component {
  constructor(props) {
    super(props);
    const ACCESS_TOKEN = localStorage.getItem('access_token');
    client = new ApolloClient({
      uri: "http://localhost:8080/v1alpha1/graphql",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <ApolloProvider client={client}>
              <Peoples />
            </ApolloProvider>
          )
        }
      </div>
    );
  }
}

export default Home;
