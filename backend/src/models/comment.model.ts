const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
        text: {
            required: true,
            type: String,
            trim: true,
            minlength: 3,
        },
        postId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        userId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
		
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Comment', commentSchema);
