import { Application, Request, Response } from 'express';


export class UtilRoutes {
    public route( app: Application ) {
        
        app.get('/api/v1/getCupOfCoffe', (req: Request, res: Response) => {
            res.status(418).json({message: "I'm a teapot!"});
        });

        
    }
}