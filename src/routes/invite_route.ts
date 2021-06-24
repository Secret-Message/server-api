import { Application, Request, Response } from 'express';
import { InviteController } from '../controllers/InviteController';
import { AuthController } from '../controllers/authController';


export class InviteRoutes {

    private invite_controller: InviteController = new InviteController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.post('/api/v1/servers/:serverId/invites', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.invite_controller.createInvite(req, res);
        });

        app.delete('/api/v1/servers/:serverId/invites/:inviteId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.invite_controller.deleteInvite(req, res);
        });

        app.get('/api/v1/servers/:serverId/invites', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.invite_controller.getInvitesInServer(req, res);
        });

    }
}