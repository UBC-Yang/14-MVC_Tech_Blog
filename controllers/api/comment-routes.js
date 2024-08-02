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
        console.error('Error creating comment:', err);
        res.status(400).json({ message: 'Failed to create comment', error: err });
    }
});

// Update Comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Comment.update(req.body, {
            where: { id: req.params.id }
        });
        if (affectedRows === 0) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(400).json({ message: 'Failed to update comment', error: err });
    }
});

// Delete Comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const affectedRows = await Comment.destroy({
            where: { id: req.params.id }
        });
        if (affectedRows === 0) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(400).json({ message: 'Failed to delete comment', error: err });
    }
});

module.exports = router;
