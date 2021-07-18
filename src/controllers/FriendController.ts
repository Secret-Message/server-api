import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class FriendController {

    public getFriendRequests(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public sendFriendRequest(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public acceptFriendRequest(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public rejectFriendRequest(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

}