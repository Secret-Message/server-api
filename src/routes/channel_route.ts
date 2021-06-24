import { Application, Request, Response } from 'express';
import { ChannelController } from '../controllers/channelController';
import { AuthController } from '../controllers/authController';


export class ChannelRoutes {

    private channel_controller: ChannelController = new ChannelController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.get('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.channel_controller.getChannel(req, res);
        });

        app.post('/api/v1/servers/:serverId/categories/:categoryId/channels', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.channel_controller.createChannel(req, res);
        });

        app.patch('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.channel_controller.updateChannel(req, res);
        });

        app.delete('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.channel_controller.deleteChannel(req, res);
        });
        
    }
}