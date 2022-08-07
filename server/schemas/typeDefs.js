const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: String!
        user: User
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String

    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookInfo:SaveBooks!): User
        removeBook(bookId: String!): User
        
    }
    input SaveBooks {
        bookId: String!
        authors: [String]
        description: String
        title:String
        image:String
        link:String
    }

`;

module.exports = typeDefs;