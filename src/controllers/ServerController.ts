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
        if( req.body.name ) {
                const server_params: IServer = {
                    name: req.body.name,
                    iconUrl: req.body.iconUrl,
                    dm: false
                }

                this.server_service.create(server_params, (err: any, server_data: IServer) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        const member_params: IMember = {
                            server: server_data._id,
                            isOwner: true,
                            user: req.decoded.userId
                        }

                        this.member_service.create(member_params, (err: any, member_data: IMember) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse('Create server successfull', { 
                                    server: server_data,
                                    member: member_data
                                }, res);
                            }
                        })
                    }
                });
        } else {
           insufficientParameters(res);
        }
    }

    public getServer(req: CustomRequest, res: Response ) {
        if( req.params.serverId ) {
            this.server_service.getOne({
                _id: req.params.serverId
            }, (err: any, server_data: IServer) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( server_data ){
                        successResponse('Server found', server_data, res);
                    }else{
                        successResponse('Server don\'t exist', server_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public updateServer(req: CustomRequest, res: Response ) {
        if ( req.params.serverId &&
            req.body.name ||
            req.body.iconUrl ) {
           this.server_service.getOne({ 
               _id: req.params.serverId
           }, (err: any, server_data: IServer) => {
               if (err) {
                   mongoError(err, res);
               }else {
                   const server_params: IServer = {
                       _id: req.params.serverId,
                       name: req.body.name ? req.body.name : server_data.name,
                       iconUrl: req.body.iconUrl ? req.body.iconUrl : server_data.iconUrl,
                       dm: server_data.dm
                   };

                   this.server_service.update(server_params, (err: any) => {
                       if (err) {
                           mongoError(err, res);
                       } else {
                           successResponse('Update server successfull', null, res);
                       }
                   });
               }
           })
       } else {
           insufficientParameters(res);
       }
    }

    public deleteServer(req: CustomRequest, res: Response ) {
        if ( req.params.serverId ){
            this.server_service.delete(req.params.serverId, 
                (err: any, server_data: IServer) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    successResponse('Server deleted', server_data, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

}