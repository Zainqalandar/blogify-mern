import { Request, Response } from 'express';
const Comment = require('../models/comment.model');

interface AuthRequest extends Request {
	user?: {
		id: string;
	};
}

const createComment = async (req: AuthRequest, res: Response) => {
	try {
		const { text, postId } = req.body;

		const userId = req.user?.id;

		const comment = await Comment.create({ text, postId, userId });

		return res.status(201).json({
			success: true,
			data: comment,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const deleteComment = async (req: Request, res: Response) => {
	try {
		console.log('Delete api')
		const { id } = req.params;
		const comment = await Comment.findByIdAndDelete(id);

		if (!comment) {
			return res.status(404).json({
				message: 'comment not found',
			});
		}

		return res.status(201).json({
			success: true,
			data: null,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

// blog post comments

const getCommentsByPostId = async (req: Request, res: Response) => {
	try {
		const { postId } = req.params;
		const comments = await Comment.find({ postId });

		return res.status(200).json({
			success: true,
			results: comments.length,
			data: comments,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	createComment,
	deleteComment,
	getCommentsByPostId,
};
