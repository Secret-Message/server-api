import { Request, Response, NextFunction } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon';
import ServerService from '../services/ServerService';
import MemberService from '../services/MemberService';
import { IServer } from '../interfaces/IServer';
import { IMember } from '../interfaces/IMember';


export class ServerController {

    private server_service: ServerService = new ServerService();
    private member_service: MemberService = new MemberService();

    public createServer(req: CustomRequest, res: Response ) {
        const { userId } = req.decoded

        if(req.body.name){
        }else{
            insufficientParameters(res);
        }
    }

    public getServer(req: CustomRequest, res: Response ) {
        if(req.params.serverId){
        }else{
            insufficientParameters(res);
        }
    }

    public updateServer(req: CustomRequest, res: Response ) {
        if( req.params.serverId &&
            req.body.name || req.body.icon_url ){
        }else{
            insufficientParameters(res);
        }
    }

    public deleteServer(req: CustomRequest, res: Response ) {
        
    }


}