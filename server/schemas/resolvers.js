const {Book, User} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if(context.user) {
                return User.findOne({_id: context.user?._id});
            }
        },
        

    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError("No user found with this email address");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);

            return {token, user};
        },
        saveBook: async (parent, arg , context) => {
            if(context.User){
                const updatedUser = await User.findOneAndUpdate(
                    { _id:context.User_id },
                    {
                        $push: {
                            savedBooks: {
                                bookId: bookId
                            }
                        }
                    },
                    {new:true, runValidators: true}
                );
                return updatedUser;
            }
        },
        removeBook: async (parent, {bookId}, context) => {
            if(context.User){
                const updatedUser = await User.findOneAndUpdate(
                    { _id:context.User_id },
                    {
                        $pull: {
                            savedBooks :{
                                bookId: bookId
                            }
                        }
                    },
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    }
};

module.exports = resolvers;