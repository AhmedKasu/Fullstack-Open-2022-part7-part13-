const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const Author = require('./models/author');
const Book = require('./models/book');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: String
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: String!): Author
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (args.author && !args.genre) {
        return Book.find({
          author: { $in: [author._id] },
        }).populate('author');
      } else if (args.genre && !args.author) {
        return Book.find({
          genres: { $in: args.genre },
        }).populate('author');
      } else if (args.author && args.genre) {
        console.log('genre', args.genre);
        return Book.find({
          $and: [
            { author: { $in: [author._id] } },
            { genres: { $in: [args.genre] } },
          ],
        }).populate('author');
      } else {
        return Book.find({}).populate('author');
      }
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author });
      let newBook;
      try {
        if (!authorExists) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
        }
        const author = await Author.findOne({ name: args.author });
        newBook = new Book({ ...args, author: author._id });
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
