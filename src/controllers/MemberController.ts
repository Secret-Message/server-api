import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class MemberController {

    public joinServer(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public leaveServer(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public banMember(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public kickMember(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

}