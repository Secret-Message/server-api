import { Application, Request, Response } from 'express';
import { ServerController } from '../controllers/ServerController';
import { AuthController } from '../controllers/AuthController';
import { CustomRequest } from '../interfaces/ICommon'

export class ServerRoutes {

    private server_controller: ServerController = new ServerController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.post('/api/v1/servers', this.auth_controller.loggedIn, (req: CustomRequest, res: Response) => {
            this.server_controller.createServer(req, res);
        });

        app.get('/api/v1/servers/:serverId', this.auth_controller.loggedIn, (req: CustomRequest, res: Response) => {
            this.server_controller.getServer(req, res);
        });

        app.patch('/api/v1/servers/:serverId', this.auth_controller.loggedIn, (req: CustomRequest, res: Response) => {
            this.server_controller.updateServer(req, res);
        });

        app.delete('/api/v1/servers/:serverId', this.auth_controller.loggedIn, (req: CustomRequest, res: Response) => {
            this.server_controller.deleteServer(req, res);
        });
        
    }
}