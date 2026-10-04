import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CartService } from '../services/cart.service.js';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    addItem: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    updateItem: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    removeItem: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    clearCart: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
}
