const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
            required: true,
            type: String,
            trim: true,
            minlength: 3,
        },
        content: {
            required: true,
            type: String,
            trim: true,
            minlength: 10,
        },
        author: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);
