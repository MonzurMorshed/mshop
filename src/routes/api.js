const express = require('express');
const AuthVerification = require('../middlewares/AuthVerification');
const { ProductBrandList, ProductCategoryList, ProductSliderList, ProductListByBrand, ProductListByCategory, ProductListBySimilier, ProductListByKeyword, ProductListByRemark, ProductDetails, ProductReviewList,CreateReview } = require('../controllers/ProductController');
const { UserOTP, VerifyLogin, UserLogout, CreateProfile, UpdateProfile, ReadProfile } = require('../controllers/UserController');
const { WishList, SaveWishList, RemoveWishList } = require('../controllers/WishListController');
const { CartList, SaveCartList, RemoveCartList, UpdateCartList } = require('../controllers/CartListController');
const { CreateInvoice, InvoiceProductList, InvoiceList, PaymentSuccess, PaymentCancel, PaymentFail, PaymentIPN } = require('../controllers/InvoiceController');
const { FeatureList } = require('../controllers/FeaturesController');

const router = express.Router();

// Product
router.get('/ProductBrandList',ProductBrandList);
router.get('/ProductCategoryList',ProductCategoryList);
router.get('/ProductSliderList',ProductSliderList);
router.get('/ProductListByBrand/:BrandID',ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID',ProductListByCategory);
router.get('/ProductListBySimilier/:CategoryID',ProductListBySimilier);
router.get('/ProductListByKeyword/:Keyword',ProductListByKeyword);
router.get('/ProductListByRemark/:Remark',ProductListByRemark);
router.get('/ProductDetails/:ProductID',ProductDetails);
router.get('/ProductReviewList/:ProductID',ProductReviewList);

// User
router.get('/UserOTP/:email',UserOTP);
router.get('/VerifyLogin/:email/:otp',VerifyLogin);
router.get('/UserLogout',AuthVerification,UserLogout);
router.post('/CreateProfile',AuthVerification,CreateProfile);
router.post('/UpdateProfile',AuthVerification,UpdateProfile);
router.get('/ReadProfile',AuthVerification,ReadProfile);

// WishList
router.get('/WishList',AuthVerification,WishList);
router.post('/SaveWishList',AuthVerification,SaveWishList);
router.post('/RemoveWishList',AuthVerification,RemoveWishList);

// CartList
router.get('/CartList',AuthVerification,CartList);
router.post('/SaveCartList',AuthVerification,SaveCartList);
router.post('/UpdateCartList/:cartID',AuthVerification,UpdateCartList);
router.post('/RemoveCartList',AuthVerification,RemoveCartList);

// Invoice & payment
router.post('/CreateInvoice',AuthVerification,CreateInvoice);
router.get('/InvoiceList',AuthVerification,InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceProductList);
router.post('/PaymentSuccess/:trxID',PaymentSuccess);
router.post('/PaymentCancel/:trxID',PaymentCancel);
router.post('/PaymentFail/:trxID',PaymentFail);
router.post('/PaymentIPN/:trx_id',PaymentIPN);

// Features
router.get('/featureList',FeatureList);

// Review
router.post('/CreateReview',AuthVerification,CreateReview);



module.exports = router;