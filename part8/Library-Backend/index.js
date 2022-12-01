const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET_KEY;

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
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author');
      return books.reduce(
        (counter, { author }) =>
          author.name === root.name ? (counter += 1) : counter,
        0
      );
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const authorExists = await Author.findOne({ name: args.author });
      let newBook;
      try {
        if (!authorExists) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
        }
        const author = await Author.findOne({ name: args.author });
        newBook = new Book({ ...args, author: author._id });
        await (await newBook.save()).populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      return Author.findOneAndUpdate(filter, update, {
        new: true,
      });
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
