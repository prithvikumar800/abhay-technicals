import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CatalogueService } from '../services/catalogue.service.js';
export declare class CatalogueController {
    private catalogueService;
    constructor(catalogueService: CatalogueService);
    getCategories: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
    getBrands: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
    getModelsByBrand: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getProducts: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getProductBySlug: (req: AuthenticatedRequest, res: Response) => Promise<void>;
}
