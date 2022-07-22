const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books');

                return userData;
            }
        },
        Users: async (parent, args) => {
            return await User.find();
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, {userId, book}) => {
            if (userId) {

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: userId },
                    { $push: { savedBooks: book } },
                    { new: true }
                );
                console.log(updatedUser);

                return updatedUser;
            }
        },
        removeBook: async (parent, {userId, bookId}) => {
            if (userId) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                console.log(updatedUser);

                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;