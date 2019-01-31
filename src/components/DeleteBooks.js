import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { bookQuery } from './Addbook';

export const deleteBook = gql`
  mutation($title: String!) {
    delete_Books(
      where: {title: {_eq:$title}}
    ) {
      affected_rows
    }
  }
`

class DeleteBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props);
  }

  deletebook(delete_Books) {
    delete_Books({ variables: this.props, refetchQueries: [{ query: bookQuery }]})
  }

  render() {
    return(
      <Mutation mutation={deleteBook}>
        {(delete_Books, { data }) => (
          <Button onClick={e => {
            e.preventDefault();
            this.deletebook(delete_Books)
          }}>
            Delete
          </Button>
        )}
      </Mutation>
    )
  }
}

export default DeleteBooks;
