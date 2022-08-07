const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }

    type Book {
        authors: [String]
        bookId: ID!
        description: String
        title: String
        image: String
        link: String

    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, bookId: ID, image: String, link: String, title: String): User
        removeBook(bookId: ID!): User
        
    }

`;

module.exports = typeDefs;