import { Request, Response } from 'express';
const Post = require('../models/post.model');

interface AuthRequest extends Request {
	user?: {
		id: string;
	};
}

const createPost = async (req: AuthRequest, res: Response) => {
	try {
		const { title, content } = req.body;

		const authorId = req.user?.id;

		if (!title || !content) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}

		const post = await Post.create({ title, content, author: authorId });

		return res.status(201).json({
			success: true,
			data: post,
		});
	} catch (error: any) {
		console.log('Error: ', error);
		return res.status(500).json({
			message: error.message,
		});
	}
};

const updatePost = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{ title, content },
			{
				new: true,
				runValidators: true,
			},
		);

		if (!post) {
			res.status(404).json({
				message: 'post not found',
			});
		}

		return res.status(201).json({
			success: true,
			message: 'updated success',
			data: post,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments', // Comment collection ka naam (database mein lowercase plural hota hai)
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },
            {
                $project: {
                    comments: 0 // Agar aapko saare comments nahi chahiye, sirf count chahiye
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            results: posts.length,
            data: posts,
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const deletePosts = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const post = await Post.findByIdAndDelete(id);

		if (!post) {
			return res.status(404).json({
				message: 'post not found',
			});
		}

		return res.status(201).json({
			success: true,
			data: null,
		});
	} catch (error: any) {
		console.log('Error: ', error);
		return res.status(500).json({
			message: error.message,
		});
	}
};

const getSinglePost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById({ _id: req.params.id });

		if (!post) {
			return res.status(404).json({
				message: 'post not found',
			});
		}

		return res.status(201).json({
			success: true,
			data: post,
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	createPost,
	getAllPosts,
	deletePosts,
	updatePost,
	getSinglePost,
};
