import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $description: String, $image: String, $link: String, $title: String){
      saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title){
        _id
        username
        email
        bookCount
        savedBooks{
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }
`;
