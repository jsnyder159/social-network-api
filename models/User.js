const { Schema, model} = require('mongoose');

const validateEmail = (email) => {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: STRING,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: STRING,
            unique: true,
            required: [true, 'Email address is required.'],
            validate: [validateEmail, 'Please usera valid email address.'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;