import * as jwt from 'jsonwebtoken';
import { CustomError } from '../middlewares/ErrorHandler';
import { Request, Response, NextFunction } from 'express';

import environment from '../config/environment';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    try {
        if (!authHeader) throw new CustomError(401, 'No token provided');

        const [bearer, token] = authHeader.split(' ');

        if (!bearer || bearer !== 'Bearer' || !token) {
            throw new CustomError(401, 'Invalid authorization header format');
        }

        const decoded = jwt.verify(token, environment.secret_token) as {
            data: string;
        };

        if (!decoded.data) throw new CustomError(401, 'Invalid token');

        next();
    } catch (error) {
        next(error);
    }
};
export default authenticateToken;
