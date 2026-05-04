import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
	user?: {
		id: string;
	};
}

const authMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(404).json({
				success: false,
				message: 'No token provided',
			});
		}

		const token = authHeader?.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			id: string;
		};

		req.user = {
			id: decoded.id,
		};
		next();
	} catch (error) {
		res.status(404).json({
			success: false,
			message: 'Invalid or expired token',
		});
	}
};

module.exports = authMiddleware;
