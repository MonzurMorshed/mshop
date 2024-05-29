const FeaturesModel = require("../models/FeaturesModel");

const FeatureListService = async () => {
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (err) {
        return { status: "fail", message: "Something went wrong." }.toString();
    }
};

module.exports = {
    FeatureListService
}
