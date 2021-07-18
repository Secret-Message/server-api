
import { ICategory } from '../interfaces/ICategory';
import categories from '../models/CategoryModel';
import { CRUD } from './CommonService';

export default class CategoryService implements CRUD {
    
    public create(params: ICategory, callback: any) {
        const _session = new categories(params);
        _session.save(callback);
    }

    public getOne(query: any, callback: any) {
        categories.findOne(query, callback);
    }

    public getMany(query: any, callback: any) {
        categories.find(query, callback);
    }

    public update(params: ICategory, callback: any) {
        const query = { _id: params._id };
        categories.findOneAndUpdate(query, params, callback);
    }
    
    public delete(_id: String, callback: any) {
        const query = { _id: _id };
        categories.deleteOne(query, callback);
    }

}