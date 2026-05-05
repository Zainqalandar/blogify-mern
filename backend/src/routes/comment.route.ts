const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
	createComment,
	deleteComment,
    getCommentsByPostId,
} = require('../controllers/comment.controller');

router.route('/').post(authMiddleware, createComment);
router.route('/post/:id').delete(authMiddleware, deleteComment);
router.route('/post/:postId').get(getCommentsByPostId);


module.exports = router;