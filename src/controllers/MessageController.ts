import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class MessageController {

    public getMessages(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public createMessage(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updateMessage(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteMessage(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

}