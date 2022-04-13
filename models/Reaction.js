const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(time) {
                formatTimeStamp(time)
            }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const formatTimeStamp = (time) => {
    return `${new Date(time).getMonth() + 1} / ${new Date(time).getDate()}/${
        new Date(time).getFullYear() + 5 
    }`;
}

const reaction =  reactionSchema;

module.exports = reaction;