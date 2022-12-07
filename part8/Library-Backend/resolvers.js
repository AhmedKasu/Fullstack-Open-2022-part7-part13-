const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;

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
        throw new GraphQLError(
          'You are not authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          }
        );
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
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          },
        });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
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
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
