import { Application, Request, Response } from 'express';
import { FriendController } from '../controllers/friendController';
import { AuthController } from '../controllers/AuthController';


export class FriendRoutes {

    private friend_controller: FriendController = new FriendController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.get('/api/v1/users/friendsRequests', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.friend_controller.getFriendRequests(req, res);
        });

        app.post('/api/v1/users/friendsRequests', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.friend_controller.sendFriendRequest(req, res);
        });

        app.post('/api/v1/users/friendsRequests/:requestId/accept', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.friend_controller.acceptFriendRequest(req, res);
        });

        app.post('/api/v1/users/friendsRequests/:requestId/reject', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.friend_controller.rejectFriendRequest(req, res);
        });
        
    }
}