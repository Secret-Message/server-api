import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';


export class UserRoutes {

    private user_controller: UserController = new UserController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.post('/api/v1/login', (req: Request, res: Response) => {
            this.auth_controller.login(req, res);
        });

        app.get('/api/v1/users/:userId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.getUserById(req, res);
        });

        app.get('/api/v1/users/friendCode/:friendCode', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.getUserByFriendCode(req, res);
        });

        app.patch('/api/v1/users', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.updateUser(req, res);
        });

        app.delete('/api/v1/users', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.deleteUser(req, res);
        });

        app.get('/api/v1/users/:userId/sharedFriend', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.getSharedFriends(req, res);
        });

        app.get('/api/v1/users/:userId/sharedServers', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.user_controller.getSharedServers(req, res);
        });
    }
}