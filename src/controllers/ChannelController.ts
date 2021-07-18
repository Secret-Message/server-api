import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class ChannelController {

    public getChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public createChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updateChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteChannel(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }
    
}