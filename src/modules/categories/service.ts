
import { ICategory } from './model';
import categories from './schema';

export default class CategoryService {
    
    public createCategory(category_params: ICategory, callback: any) {
        const _session = new categories(category_params);
        _session.save(callback);
    }

    public filterCategory(query: any, callback: any) {
        categories.findOne(query, callback);
    }

    public updateCategory(category_params: ICategory, callback: any) {
        const query = { _id: category_params._id };
        categories.findOneAndUpdate(query, category_params, callback);
    }
    
    public deleteCategory(_id: String, callback: any) {
        const query = { _id: _id };
        categories.deleteOne(query, callback);
    }

}