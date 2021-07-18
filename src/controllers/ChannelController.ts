import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'
import ChannelService from '../services/ChannelService';
import { IChannel } from '../interfaces/IChannel';

export class ChannelController {

    private channel_service: ChannelService = new ChannelService();

    public getChannels(req: Request, res: Response ) {
        if( req.params.serverId && req.params.categoryId ) {
            this.channel_service.getMany({
                category: req.params.categoryId
            }, (err: any, channel_data: IChannel) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( channel_data ){
                        successResponse('Channel found', channel_data, res);
                    }else{
                        successResponse('Channel don\'t exist', channel_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getChannelById(req: Request, res: Response ) {
        if( req.params.serverId && req.params.categoryId && req.params.channelId ) {
            this.channel_service.getOne({
                _id: req.params.channelId
            }, (err: any, channel_data: IChannel) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( channel_data ){
                        successResponse('Channel found', channel_data, res);
                    }else{
                        successResponse('Channel don\'t exist', channel_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public createChannel(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId &&
            req.body.name && req.body.voice ) {
            const channel_params: IChannel = {
                category: req.params.categoryId,
                name: req.body.name,
                voice: req.body.voice,
                number: req.body.number
            }

            this.channel_service.create(channel_params, (err: any, channel_data: IChannel) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create channel successfull', channel_data, res);
                }
            });
        }else {
            insufficientParameters(res);
        }
    }

    public updateChannel(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId &&
            req.body.name || req.body.number) {
            this.channel_service.getOne({ 
                _id: req.params.channelId
            }, (err: any, channel_data: IChannel) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    const channel_params: IChannel = {
                        _id: req.params.channelId,
                        category: req.params.categoryId,
                        name: req.body.name ? req.body.name : channel_data.name,
                        voice: channel_data.voice,
                        number: req.body.number ? req.body.number : channel_data.number,
                    };

                    this.channel_service.update(channel_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update channel successfull', null, res);
                        }
                    });
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public deleteChannel(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId ){
            this.channel_service.delete(req.params.channelId, 
                (err: any, category_data: IChannel ) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    successResponse('Channel deleted', category_data, res);
                }
            })
        }
    }
    
}