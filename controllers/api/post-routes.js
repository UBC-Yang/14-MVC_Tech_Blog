const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(400).json({ message: 'Error creating post', error: err });
    }
});

// Update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updatePost[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(updatePost);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({ message: 'Error updating post', error: err });
    }
});

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: { id: req.params.id }
        });
        if (!deletePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(deletePost);
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: 'Error deleting post', error: err });
    }
});

module.exports = router;
