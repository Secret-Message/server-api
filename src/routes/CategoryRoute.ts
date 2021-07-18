import { Application, Request, Response } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { AuthController } from '../controllers/AuthController';


export class CategoryRoutes {

    private category_controller: CategoryController = new CategoryController();
    private auth_controller: AuthController = new AuthController();

    public route( app: Application ) {
        
        app.get('/api/v1/servers/:serverId/categories/:categoryId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.category_controller.getCategory(req, res);
        });

        app.post('/api/v1/servers/:serverId/categories', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.category_controller.createCategory(req, res);
        });

        app.patch('/api/v1/servers/:serverId/categories/:categoryId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.category_controller.updateCategory(req, res);
        });

        app.delete('/api/v1/servers/:serverId/categories/:categoryId', this.auth_controller.loggedIn, (req: Request, res: Response) => {
            this.category_controller.deleteCategory(req, res);
        });
        
    }
}