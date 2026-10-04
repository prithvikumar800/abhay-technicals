import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
export declare class AdminController {
    private catalogueRepo;
    private orderRepo;
    getDashboardStats: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
    getProducts: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    createProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    updateProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    deleteProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getOrders: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
}
