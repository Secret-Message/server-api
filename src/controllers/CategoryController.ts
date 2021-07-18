import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'
import CategoryService from '../services/CategoryService';
import { ICategory } from '../interfaces/ICategory';

export class CategoryController {

    private category_service: CategoryService = new CategoryService();

    public getCategories(req: Request, res: Response ) {
        if( req.params.serverId ) {
            this.category_service.getMany({
                server: req.params.serverId
            }, (err: any, category_data: ICategory) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( category_data ){
                        successResponse('Category found', category_data, res);
                    }else{
                        successResponse('Category don\'t exist', category_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getCategoryById(req: Request, res: Response ) {
        if( req.params.serverId && req.params.categoryId ) {
            this.category_service.getOne({
                _id: req.params.categoryId,
                server: req.params.serverId
            }, (err: any, category_data: ICategory) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if( category_data ){
                        successResponse('Category found', category_data, res);
                    }else{
                        successResponse('Category don\'t exist', category_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public createCategory(req: Request, res: Response ) {
        if( req.params.serverId  && req.body.name ) {
            const category_params: ICategory = {
                server: req.params.serverId,
                name: req.body.name,
                number: req.body.number
            }

            this.category_service.create(category_params, (err: any, category_data: ICategory) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create category successfull', category_data, res);
                }
            });
        }
    }

    public updateCategory(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId &&
            req.body.name || req.body.number ) {
            this.category_service.getOne({ 
                _id: req.params.categoryId
            }, (err: any, category_data: ICategory) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    const category_params: ICategory = {
                        _id: req.params.categoryId,
                        server: req.body.server,
                        name: req.body.name ? req.body.name : category_data.name,
                        number: req.body.number ? req.body.number : category_data.number,
                    };

                    this.category_service.update(category_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update category successfull', null, res);
                        }
                    });
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public deleteCategory(req: Request, res: Response ) {
        if( req.params.serverId  && req.params.categoryId){
            this.category_service.delete(req.params.categoryId, 
                (err: any, category_data: ICategory) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    successResponse('Category deleted', category_data, res);
                }
            })
        }
    }
    
}