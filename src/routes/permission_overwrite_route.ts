import { Application, Request, Response } from 'express';
import { PermissionOverwriteController } from '../controllers/permissionOverwriteController';
import { AuthController } from '../controllers/AuthController';


export class PermissionOverwriteRoutes {

    private permission_overwrite_controller: PermissionOverwriteController = new PermissionOverwriteController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.post('/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.assignPermissionOverwriteToCategory(req, res);
        });

        app.post('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.assignPermissionOverwriteToChannel(req, res);
        });

        app.get('/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.getPermissionOverwritesInCategory(req, res);
        });

        app.get('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.getPermissionOverwritesInChannel(req, res);
        });

        app.patch('/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites/:overwriteID', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.updatePermissionOverwritesInCategory(req, res);
        });

        app.patch('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites/overwriteID', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.updatePermissionOverwritesInChannel(req, res);
        });

        app.delete('/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites/:overwriteID', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.deletePermissionOverwritesFromCategory(req, res);
        });

        app.delete('/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites/overwriteID', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.permission_overwrite_controller.deletePermissionOverwritesFromChannel(req, res);
        });

    }
}