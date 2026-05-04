const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
			trim: true,
			minlength: 3,
		},
		email: {
			required: true,
			type: String,
			unique: true,
			lowercase: true,
			match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
		},
		password: {
			required: true,
			type: String,
			minlength: 6,
			select: false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
