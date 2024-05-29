const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductSliderModel = require('../models/BrandModel');
const ProductModel = require('../models/ProductModel');
const ProductDetailModel = require('../models/ProductDetailModel');
const ReviewModel = require('../models/ReviewModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const BrandListService = async() => {
    try {
        let data = await BrandModel.find();
        return {status: 'success',data: data}
    } catch (e) {
        return {status: 'fail',data: e}.toString()
    }
}

const CategoryListService = async() => {
    try {
        let data = await CategoryModel.find();
        return {status: 'success',data: data}
    } catch (e) {
        return {status: 'fail',data: e}.toString()
    }
}

const SliderListService = async() => {
    try {
        let data = await ProductSliderModel.find();
        return {status: 'success',data: data}
    } catch (e) {
        return {status: 'fail',data: e}.toString();
    }
}

const ListByBrandService = async(req) => {

    try {
        let BrandID = new ObjectId(req.params.BrandID);
        let MatchStages = {$match:{brandID:BrandID}};
        let JoinWithBrandStages = {$lookup:{
            from: "brands",
            localField: "brandID",
            foreignField: "_id",
            as: "brand"
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category"
        }};
        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};

        let ProjectionStages = {$project:{
            'brand._id':0,
            'category._id':0,
            'brandID':0,
            'categoryID':0,
        }};

        let data = await ProductModel.aggregate([
                MatchStages,
                JoinWithBrandStages,
                JoinWithCategoryStages,
                UnwindBrandStages,
                UnwindCategoryStages,
                ProjectionStages
            ]);

        return {status: 'success',data: data}
    } catch (err) {
        return {status: 'fail',data: err}.toString();
    }
}

const ListByCategoryService = async(req) => {
    try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStages = {$match:{categoryID:CategoryID}};
        let JoinWithBrandStages = {$lookup:{
            from: "brands",
            localField: "brandID",
            foreignField: "_id",
            as: "brand"
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category"
        }};
        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};

        let ProjectionStages = {$project:{
            'brand._id':0,
            'category._id':0,
            'brandID':0,
            'categoryID':0,
        }};

        let data = await ProductModel.aggregate([
                MatchStages,
                JoinWithBrandStages,
                JoinWithCategoryStages,
                UnwindBrandStages,
                UnwindCategoryStages,
                ProjectionStages
            ]);
        return {status: 'success',data: data}
    } catch (err) {
        return {status: 'fail',data: err}.toString();
    }
}

const ListBySimilierService = async(req) => {
    try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStages = {$match:{categoryID:CategoryID}};
        let LimitStages = {$limit:20};
        
        let JoinWithBrandStages = {$lookup:{
            from: "brands",
            localField: "brandID",
            foreignField: "_id",
            as: "brand"
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category"
        }};
        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};

        let ProjectionStages = {$project:{
            'brand._id':0,
            'category._id':0,
            'brandID':0,
            'categoryID':0,
        }};

        let data = await ProductModel.aggregate([
                MatchStages,
                LimitStages,
                JoinWithBrandStages,
                JoinWithCategoryStages,
                UnwindBrandStages,
                UnwindCategoryStages,
                ProjectionStages
            ]);
        return {status: 'success',data: data}
    } catch (err) {
        return {status: 'fail',data: err}.toString();
    }
}

const ListByKeywordService = async(req) => {
    try {
        console.log('req.params.Keyword : ',req.params.Keyword)
        let SearchRegex = {
            "$regex": req.params.Keyword,
            "$options":"i"
        };
        let SearchParams = [
            {title: SearchRegex},{shortDes: SearchRegex}
        ];
        let SearchQuery = {"$or":SearchParams};

        let MatchStages = {$match:SearchQuery};

        let JoinWithBrandStages = {$lookup:{
            from: "brands",
            localField: "brandID",
            foreignField: "_id",
            as: "brand"
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category"
        }};
        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};

        let ProjectionStages = {$project:{
            'brand._id':0,
            'category._id':0,
            'brandID':0,
            'categoryID':0,
        }};
        
        let data = await ProductModel.aggregate([
            MatchStages,
            JoinWithBrandStages,
            JoinWithCategoryStages,
            UnwindBrandStages,
            UnwindCategoryStages,
            ProjectionStages
        ]);
        return {status: 'success',data: data}
    } catch (err) {
        return {status: 'fail',data: err}
    }
    
}

const ListByRemarkService = async(req) => {
    try{
        let Remark = req.params.Remark;
        let MatchStages = {$match:{remark:Remark}};
        let JoinWithBrandStages = {$lookup:{
            from: 'brands',
            localField: 'brandID',
            foreignField: '_id',
            as: 'brand'
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: 'categories',
            localField: 'categoryID',
            foreignField: '_id',
            as: 'category'
        }};
        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};
        let ProjectionStages = {$project:{
            'brand._id':0,'category._id':0,'brandID': 0, 'categoryID': 0
        }};

        let data = await ProductModel.aggregate([
            MatchStages,
            JoinWithBrandStages,
            JoinWithCategoryStages,
            UnwindBrandStages,
            UnwindCategoryStages,
            ProjectionStages
        ]);
        return {status: 'success',data: data}

    } catch(e) {
        return {status: 'fail',data: err}.toString();
    }
}

const DetailsService = async(req) => {
    console.log(req.params.ProductID);
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStages = {$match:{_id:ProductID}};

        let JoinWithBrandStages = {$lookup:{
            from: "brands",
            localField: "brandID",
            foreignField: "_id",
            as: "brand"
        }};
        let JoinWithCategoryStages = {$lookup:{
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category"
        }};
        let JoinWithProductDetailsStages = {$lookup:{
            from: "productdetails",
            localField: "_id",
            foreignField: "productID",
            as: "details"
        }};

        let UnwindBrandStages = {$unwind:"$brand"};
        let UnwindCategoryStages = {$unwind:"$category"};
        let UnwindDetailsStages = {$unwind:"$details"};

        let ProjectionStages = {$project:{
            'brand._id':0,
            'category._id':0
        }};

        let data = await ProductModel.aggregate([
                MatchStages,
                JoinWithBrandStages,
                JoinWithCategoryStages,
                JoinWithProductDetailsStages,
                UnwindBrandStages,
                UnwindCategoryStages,
                UnwindDetailsStages,
                ProjectionStages
            ]);

        return {status: 'success',data: data}
    } catch (err) {
        return {status: 'fail',data: err}.toString();
    }
}

const ReviewListService = async(req) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage = {$match:{productID: ProductID}};

        let JoinWithProfileStages = {$lookup:{
            from: 'profiles',
            localField: 'userID',
            foreignField: 'userID',
            as: 'profile'
        }};

        let UnwindProfileStages = {$unwind: '$profile'};
        let ProjectionStages = {$project: {
            'des': 1,
            'rating': 1,
            'profile.cus_name': 1
        }};

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStages,
            UnwindProfileStages,
            ProjectionStages
        ]);
        
        return {status: "success", data:data}
    } catch(e) {
        return {status: "fail", data: e}.toString();
    }
}

const CreateReviewService = async(req) => {
    try{
        let user_id = req.headers.user_id;
        await ReviewModel.Create({
            productID: req.body['productID'],
            userID: user_id,
            des: req.body['des'],
            rating: req.body['rating']
        });
        return {status: "success"}
    } catch(e) {
        return {status: "fail", data: e}.toString();
    }
}

module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilierService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    CreateReviewService
}