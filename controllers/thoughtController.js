






module.exports = {

    // Get all users
    getAllUser(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    allUsers: await allUsers(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get Single User
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then(async (singleUser) =>
                !singleUser
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        singleUser,
                        getSingleUser: await this.getSingleUser(req.params.userId),
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a User and thoughts associated with them.
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such User exists.'})
                    : Thought.findOneAndUpdate(
                        { user: req.params.userId },
                        { $pull: { user: req.params.userId } },
                        { new: true }    
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'User deleted, but no thoughts found.',
                    })
                    : res.json({ message : 'User successfully deleted.'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add thought to user.
    addThought(req, res) {
        console.log('You are adding a thought.');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {thoughts: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID.' })
                    : res.json(user)    
            )
            .catch((err) => res.status(500).json(err));
    },
    
}