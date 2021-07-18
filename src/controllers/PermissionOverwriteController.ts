import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class PermissionOverwriteController {

    public assignPermissionOverwriteToCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public assignPermissionOverwriteToChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public getPermissionOverwritesInCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public getPermissionOverwritesInChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updatePermissionOverwritesInCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updatePermissionOverwritesInChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deletePermissionOverwritesFromCategory(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deletePermissionOverwritesFromChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }
    
}