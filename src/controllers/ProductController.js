const {
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
} = require('../service/ProductServices')

exports.ProductBrandList = async(req,res) => {
    BrandListService().then(
        (data) => {return res.status(200).json(data);},
        (err) => {return res.status(500).json(err);}
    );

}

exports.ProductCategoryList = async(req,res) => {
    CategoryListService().then(
        (data) => {return res.status(200).json(data);},
        (err) => {return res.status(500).json(err);}
    );
}

exports.ProductSliderList = async(req,res) => {
    SliderListService().then(
        (data) => {return res.status(200).json(data);},
        (err) => {return res.status(500).json(err);}
    );
}

exports.ProductListByBrand = async(req,res) => {
    let result = await ListByBrandService(req);
    return res.status(200).json(result);
}

exports.ProductListByCategory = async(req,res) => {
    let result = await ListByCategoryService(req);
    return res.status(200).json(result);
}

exports.ProductListBySimilier = async(req,res) => {
    let result = await ListBySimilierService(req);
    return res.status(200).json(result);
}

exports.ProductListByKeyword = async(req,res) => {
    
}

exports.ProductListByKeyword = async(req,res) => {
    let result = await ListByKeywordService(req);
    return res.status(200).json(result);
}

exports.ProductListByRemark = async(req,res) => {
    let result = await ListByRemarkService(req);
    return res.status(200).json(result);
}

exports.ProductDetails = async(req,res) => {
    let result = await DetailsService(req);
    return res.status(200).json(result);
}

exports.ProductReviewList = async(req,res) => {
    let result = await ReviewListService(req);
    return res.status(200).json(result);
}

exports.CreateReview = async(req,res) => {
    let result = await CreateReviewService(req);
    return res.status(200).json(result);

}