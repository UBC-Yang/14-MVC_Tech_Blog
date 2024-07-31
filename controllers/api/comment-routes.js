const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create Comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update Comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update(req.body, {
            where: {id: req.params.id}
        });
        if (!updateComment) {
            res.status(404).json({ message: 'No comment found' })
        }
        res.status(200).json(updateComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {id: req.params.id}
        });
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found' });
        }
        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;