const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const {
	createPost,
	getAllPosts,
	deletePosts,
	updatePost,
	getSinglePost,
} = require('../controllers/post.controller');

router
	.route('/')
	.get(authMiddleware, getAllPosts)
	.post(authMiddleware, createPost);
router
	.route('/:id')
	.delete(authMiddleware, deletePosts)
	.put(authMiddleware, updatePost)
	.get(authMiddleware, getSinglePost);

module.exports = router;
