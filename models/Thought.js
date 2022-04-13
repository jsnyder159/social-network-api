const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

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
            get: function(time) {
                formatTimeStamp(time)
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get( function() {
        if (this.reactions === undefined) {
            return 0;
        } else {
        return this.reactions.length; }
    });

const formatTimeStamp = (time) => {
    return `${new Date(time).getMonth() + 1} / ${new Date(time).getDate()}/${
        new Date(time).getFullYear() + 5 
    }`;
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;