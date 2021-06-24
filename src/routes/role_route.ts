import { Application, Request, Response } from 'express';
import { RoleController } from '../controllers/roleController';
import { AuthController } from '../controllers/authController';


export class RoleRoutes {

    private role_controller: RoleController = new RoleController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.get('/api/v1/servers/:serverId/members/:memberId/roles', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.getMemberRoles(req, res);
        });

        app.get('/api/v1/servers/:serverId/roles', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.getServerRoles(req, res);
        });

        app.post('/api/v1/servers/:serverId/roles', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.createRole(req, res);
        });

        app.patch('/api/v1/servers/:serverId/roles/:roleId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.updateRole(req, res);
        });

        app.delete('/api/v1/servers/:serverId/roles/:roleId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.deleteRole(req, res);
        });

        app.post('/api/v1/servers/:serverId/members/:memberId/roles', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.assignRoleToMember(req, res);
        });

        app.delete('/api/v1/servers/:serverId/members/:memberId/roles/:assignId', this.auth_controller.loggedIn(), (req: Request, res: Response) => {
            this.role_controller.removeRoleFromMember(req, res);
        });
    }
}