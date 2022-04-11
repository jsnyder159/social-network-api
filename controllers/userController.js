const { User, Thought } = require('../models');

module.exports = {
    
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "There are no users with that ID."})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Delete a user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.parama.courseId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with that ID.' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
                )
                .then(() => res.json({ message: 'User and thoughts deleted.'}))
                .catch((err) => res.status(500).json(err));
    },

    // Update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { reunValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: "No user with that ID."})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },   
};