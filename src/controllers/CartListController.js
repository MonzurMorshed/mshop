const { CartListService, SaveCartListService, UpdateCartListService, RemoveCartListService } = require("../service/CartListServices")

exports.CartList = async (req,res) => {
    let result = await CartListService(req);
    return res.status(200).json(result);
}

exports.SaveCartList = async (req,res) => {
    let result = await SaveCartListService(req);
    return res.status(200).json(result);
}

exports.UpdateCartList = async (req,res) => {
    let result = await UpdateCartListService(req);
    return res.status(200).json(result);
}

exports.RemoveCartList = async (req,res) => {
    let result = await RemoveCartListService(req);
    return res.status(200).json(result);
}