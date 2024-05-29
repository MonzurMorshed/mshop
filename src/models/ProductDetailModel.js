const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    img4: {
        type: String,
        required: true
    },
    img5: {
        type: String
    },
    img6: {
        type: String
    },
    img7: {
        type: String
    },
    img8: {
        type: String
    },
    shortDes: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: Boolean,
        required: true
    },
    discountPrice: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    star: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

const ProductDetailModel = mongoose.model('productdetails',DataSchema);
module.exports = ProductDetailModel;