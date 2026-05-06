import { Request, Response } from 'express';
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'All fileds are required',
			});
		}

		if (password.Length < 6) {
			res.status(400).json({
				message: 'Password must be 6+ chars',
			});
		}

		const existingUser = await User.findOne({ email });

		console.log('existingUser: ', existingUser);

		if (existingUser) {
			return res.status(400).json({
				message: 'Email already exists!',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		console.log('type of: ', typeof hashedPassword);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			},
		);

		console.log('Email token: ', token);

		return res.status(201).json({
			success: true,
			message: 'Registered. Verify email.',
		});
	} catch (error: any) {
		console.log('error: ', error);
		res.status(500).json({ message: 'Server error' });
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email & password required',
			});
		}

		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return res.status(400).json({
				message: 'Invalid credentials',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({
				message: 'Invalid credentials',
			});
		}

		if (!user.isVerified) {
			return res.status(403).json({ message: 'Verify email first' });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		res.status(201).json({
			success: true,
			token,
			user: {
				id: user._id,
				name: user.name,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

const emailVerify = async (req: Request, res: Response) => {
	try {
		const { token } = req.params;

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			id: string;
		};

		await User.findByIdAndUpdate(decoded.id, { isVerified: true });

		res.json({
			message: 'Email verified',
		});
	} catch (error) {
		console.log('error: ', error);
		res.status(400).json({ message: 'Invalid/expired token' });
	}
};

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().select('-isVerified');

		res.status(201).json({
			success: true,
			results: users.length,
			data: users,
		});
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { register, emailVerify, login, getAllUsers };
