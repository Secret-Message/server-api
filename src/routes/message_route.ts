import { Application, Request, Response } from 'express';
import { MessageController } from '../controllers/messageController';
import { AuthController } from '../controllers/authController';


export class MessageRoutes {

    private message_controller: MessageController = new MessageController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.get('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.message_controller.getMessages(req, res);
        });

        app.post('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.message_controller.createMessage(req, res);
        });

        app.patch('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.message_controller.updateMessage(req, res);
        });

        app.delete('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.message_controller.deleteMessage(req, res);
        });
        
    }
}