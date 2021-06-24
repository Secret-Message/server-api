import { Application, Request, Response } from 'express';
import { MemberController } from '../controllers/memberController';
import { AuthController } from '../controllers/authController';


export class MemberRoutes {

    private member_controller: MemberController = new MemberController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.post('/api/v1/join/:serverId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.member_controller.joinServer(req, res);
        });

        app.delete('/api/v1/users/servers/:serverId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.member_controller.leaveServer(req, res);
        });

        app.delete('/api/v1/servers/:serverId/members/:memberId/ban', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.member_controller.banMember(req, res);
        });

        app.delete('/api/v1/servers/:serverId/members/:memberId/kick', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.member_controller.kickMember(req, res);
        });

    }
}