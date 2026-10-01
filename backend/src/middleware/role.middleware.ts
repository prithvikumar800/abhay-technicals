import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/index.js';
import { sendError } from '../utils/response.js';

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required.', 401, 'UNAUTHORIZED', undefined, req.id);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        'Forbidden. You do not have permission to perform this action.',
        403,
        'FORBIDDEN',
        { requiredRoles: allowedRoles, currentRole: req.user.role },
        req.id
      );
      return;
    }

    next();
  };
}
