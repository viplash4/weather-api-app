import * as jwt from 'jsonwebtoken';
import { CustomError } from '../middlewares/ErrorHandler';
import { Request, Response, NextFunction } from 'express';
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token_secret = 'j351e';
    const authHeader = req.headers['authorization'];
    try {
        if (!authHeader) throw new CustomError(401, 'No token provided');

        const [bearer, token] = authHeader.split(' ');

        if (!bearer || bearer !== 'Bearer' || !token) {
            throw new CustomError(401, 'Invalid authorization header format');
        }

        const decoded = jwt.verify(token, token_secret) as { data: string };

        if (!decoded.data) throw new CustomError(401, 'Invalid token');

        next();
    } catch (error) {
        next(error);
    }
};
export default authenticateToken;
