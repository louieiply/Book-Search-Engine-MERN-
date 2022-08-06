const {Book, User} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        User: async (parent, {_id, username}) => {
            const params = _id ? {_id} : username ? {username} : {};
            return User.findOne(params);
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
        removeBook: async (parent, {bookId}, context) => {
            if(context.User){
                const book = await User.findOneAndUpdate(
                    { _id:context.User_id },
                    {
                        $pull: {
                            savedBooks :{
                                _id: bookId
                            }
                        }
                    },
                    {new:true}
                );
            }
        }
    }
}