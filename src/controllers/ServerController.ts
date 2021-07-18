import { Request, Response, NextFunction } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon';
import ServerService from '../services/ServerService';
import MemberService from '../services/MemberService';
import { IServer } from '../interfaces/IServer';
import { IMember } from '../interfaces/IMember';


export class ServerController {

    private server_service: ServerService = new ServerService();
    private member_service: MemberService = new MemberService();

    public createServer(req: CustomRequest, res: Response ) {
        notWorkingYet(null, res)
    }

    public getServer(req: CustomRequest, res: Response ) {
        notWorkingYet(null, res)
    }

    public updateServer(req: CustomRequest, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteServer(req: CustomRequest, res: Response ) {
        notWorkingYet(null, res)
    }


}