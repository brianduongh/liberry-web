import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Row, Col } from 'reactstrap';
import AddBook from './Addbook';
import DeleteBooks from './DeleteBooks';


// Create gql query
const BOOK_QUERY = gql`
  query {
    Books {
      title
      author
      summary
      cover
    }
  }
`;

class Peoples extends Component {
  render() {
    return(
      <div>
        <h1>Books</h1>
        <AddBook />
        <div style={{
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center'
        }}>
        <Container>
          <Query query={BOOK_QUERY}>
            {
              ({ loading, err, data }) => {
                if (loading) return <h4>loading..</h4>
                if (err) console.log(err);
                if (data) console.log(data);

                return data.Books.map(book => (
                  <Row style={{ 'padding-bottom': '10px' }}>
                    <Col md={2}>
                      <img src={book.cover} alt="bookcover" />
                    </Col>
                    <Col md={10}>
                    <div style={{ 'font-size': '30px' }}>{book.title}</div>
                    <h4>{book.author}</h4>
                    {book.summary}
                    <br />
                    <DeleteBooks title={book.title} />
                    </Col>
                  </Row>
                ));
              }
            }
          </Query>
        </Container>
        </div>
      </div>
    )
  }
}

export default Peoples;
