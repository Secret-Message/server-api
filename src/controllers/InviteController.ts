import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class InviteController {

    public createInvite(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteInvite(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public getInvitesInServer(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }
    
}