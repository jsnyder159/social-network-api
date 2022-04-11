const { Schema, model } = require('mongoose');
const Reactions= require('./Reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{ 
            type: Schema.Types.ObjectId,
             ref: 'Reactions',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('getReactions')
    .get(() =>{
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;