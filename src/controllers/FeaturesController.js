const { FeatureListService } = require("../service/FeaturesServices");

exports.FeatureList = async (req,res) => {
    let result = await FeatureListService(req);
    return res.status(200).json(result);
}