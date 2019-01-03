import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


// Create gql query
const PEOPLES_QUERY = gql`
  query {
    People (
      distinct_on: [name],
      order_by: [{name:desc}]
    ) {
      name
    }
  }
`;

class Peoples extends Component {
  render() {
    return(
      <Fragment>
        <h1>Peoples</h1>
        <Query query={PEOPLES_QUERY}>
          {
            ({ loading, err, data }) => {
              if (loading) return <h4>loading..</h4>
              if (err) console.log(err);

              return <Fragment>
                {
                  console.log(data)
                }
              </Fragment>;
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Peoples;
