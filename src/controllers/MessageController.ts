import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'
import { IMessage } from '../interfaces/IMessage';
import MessageService from '../services/MessageService';

export class MessageController {

    private message_service: MessageService = new MessageService();

    public getMessages(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId ) {
            this.message_service.getMany({
                channel: req.params.channelId
            }, (err: any, message_data: IMessage) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( message_data ){
                        successResponse('Message found', message_data, res);
                    }else{
                        successResponse('Message don\'t exist', message_data, res);
                    }
                }
            }, 1 < Number(req.query.limit) && Number(req.query.limit) < 50 ? Number(req.query.limit) : 50
            , 0 < Number(req.query.offset) ? Number(req.query.offset) : 0)
        } else {
            insufficientParameters(res);
        }
    }

    public createMessage(req: CustomRequest, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId &&
            req.body.contnet != null ) {
            const message_params: IMessage = {
                channel: req.params.channelId,
                author: req.decoded.userId,
                content:  req.body.contnet,
                parentMessage:  req.body.parentMessage,
            }

            this.message_service.create(message_params, (err: any, message_data: IMessage) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Message sended', message_data, res);
                }
            });
        }else {
            insufficientParameters(res);
        }
    }

    public updateMessage(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId && req.params.messageId &&
            req.body.content ) {
            this.message_service.getOne({ 
                _id: req.params.messageId
            }, (err: any, message_data: IMessage ) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    const message_params: IMessage = {
                        _id: req.params.messageId,
                        channel: message_data.channel,
                        author: message_data.author,
                        content:  req.body.content
                    };

                    if( message_data.parentMessage ){
                        message_params.parentMessage =  message_data.parentMessage
                    }

                    this.message_service.update(message_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update message successfull', null, res);
                        }
                    });
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public deleteMessage(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId && req.params.channelId && req.params.messageId ){
            this.message_service.delete(req.params.messageId, 
                (err: any, message_data: IMessage ) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    successResponse('Message deleted', message_data, res);
                }
            })
        }
    }

}