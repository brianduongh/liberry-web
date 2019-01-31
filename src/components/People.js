import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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
      <Fragment>
        <h1>Books</h1>
        <AddBook />
        <Query query={BOOK_QUERY}>
          {
            ({ loading, err, data }) => {
              if (loading) return <h4>loading..</h4>
              if (err) console.log(err);
              if (data) console.log(data);

              return data.Books.map(book => (
                <div class="card">
                  <img class="card-img-top" src={book.cover} alt="Card cap" />
                    <div class="card-body">
                      <h4 class="card-title">{book.title}</h4>
                      <h5 class="card-title">{book.author}</h5>
                      <p class="card-text">{book.summary}</p>
                    </div>
                    <DeleteBooks title={book.title} />
                </div>
              ));
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Peoples;
