import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class CategoryController {

    public getCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public createCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updateCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }
    
}