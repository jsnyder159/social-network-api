const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

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
             ref: 'reaction',
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
    .virtual('getReaction')
    .get(() =>{
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;