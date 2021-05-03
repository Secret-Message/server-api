// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const categoryService = require('../services/category.service.js');

const createCategory = (req, res, next) => {
    const { serverUuid, name } = req.body;
    const { userId } =  req.decoded;

    if(!serverUuid || !name){
        res.status(403).json({ msg: "You must specify serverUuid and name( for category )"})
        return;
    }

    categoryService.createCategory(userId, serverUuid, name, (err, sqlRes) => {
        res.status(sqlRes.status).json({  msg: sqlRes.msg})
    })
}

const deleteCategory = (req, res, next) => {
    const { categoryId } = req.body;
    const { userId } =  req.decoded;

    if(!categoryId ){
        res.status(403).json({ status: "error", msg: "Yopu must specify categoryId to delete"})
        return;
    }

    categoryService.deleteCategory(userId, categoryId, (err, sqlRes) => {
        res.status(sqlRes.status).json({ newCategory: sqlRes.msg})
    })
}

const updateCategory = (req, res, next) => {
    const { userId } =  req.decoded;
    const { categoryId, name } = req.body;

    if(categoryId && name){
        categoryService.changeCategoryName(userId, categoryId, name, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide categoryId and name" });
        return;
    }
}

const getCategoryChannels = (req, res, next) => {
    const { userId } =  req.decoded;
    const { categoryId } = req.body; 

    if(categoryId){
        categoryService.getChannels(userId, categoryId, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide categoryId" });
    }
}

module.exports = { 
    createCategory, 
    deleteCategory, 
    updateCategory, 
    getCategoryChannels 
}