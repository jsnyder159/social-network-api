const { Thought, User} = require ('../models')

module.exports = {

    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {console.log(err); res.status(500).json(err)});
    }, 

    // Get Single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: "No thought with that ID."})
                : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true}
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID.'
                    })
                    : res.json("Created the Thought.")
            )
    },

    // Update Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There is no thought with that ID.'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // Delete Thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID."})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought created, but there are no users with that ID."})
                    : res.json({ message: "Thought successfully deleted."})
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a thought reaction
    addThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID.'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // Remove thought reaction
    removeThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};