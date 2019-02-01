import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { FormGroup, FormControl, Button, InputGroup, Form } from 'react-bootstrap';
import gql from 'graphql-tag';
import axios from 'axios';

export const bookQuery = gql`
  query {
    Books {
      title
      author
      summary
      cover
    }
  }
`;

export const addBooks = gql`
    mutation($author: String!, $title: String!, $isbn: Int!, $cover: String!, $summary: String!) {
        insert_Books(
            objects: [
                {
                  author: $author,
                  title: $title,
                  cover: $cover,
                  isbn: $isbn,
                  summary: $summary
                }
              ]
          ){
            affected_rows
          }
    }
`;

class Addbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      isbn: '',
      summary: '',
      cover: ''
    }
  }

  addbooks(insert_Books) {
    insert_Books({ variables: this.state, refetchQueries: [{ query: bookQuery }] });
    this.setState({ isbn: '' });
  }

  render() {
    return(
      <Mutation mutation={addBooks}>
        {(insert_Books, { data }) => (
            <Form
                style={{ 'padding-bottom': '20px' }}
                onSubmit={e => {
                    e.preventDefault();
                    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.isbn}+isbn&key=AIzaSyCekaWwYYUa61_90Z8UVPjdoYvVAWTkqhI`)
                    .then(response => {
                      this.setState({
                        title: response.data.items[0].volumeInfo.title,
                        author: response.data.items[0].volumeInfo.authors[0],
                        summary: response.data.items[0].volumeInfo.description,
                        cover: response.data.items[0].volumeInfo.imageLinks.thumbnail
                      });
                      this.addbooks(insert_Books);
                    })
                    .catch(error => console.log(error))
                }}
            >
                <FormGroup controlId="Createtodo" style={{ 'margin-bottom': '0px' }}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.state.isbn}
                            placeholder="Enter ISBN"
                            onChange={e => this.setState({ isbn: e.target.value })}
                        />
                        <InputGroup.Button>
                            <Button type="submit"><i className="fas fa-plus"></i></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        )}
    </Mutation>
    )
  }
}

export default Addbook;
