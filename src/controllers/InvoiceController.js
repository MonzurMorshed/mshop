const { CreateInvoiceService, PaymentSuccessService, PaymentFailService, PaymentCancelService, InvoiceListService, InvoiceProductListService, PaymentIPNService } = require("../service/InvoiceServices")

exports.CreateInvoice = async(req, res) => {
    let result = await CreateInvoiceService(req);
    return res.status(200).json(result);
}

exports.PaymentSuccess = async(req, res) => {
    let result = await PaymentSuccessService(req);
    return res.status(200).json(result);
}

exports.PaymentFail = async(req, res) => {
    let result = await PaymentFailService(req);
    return res.status(200).json(result);
}

exports.PaymentCancel = async(req, res) => {
    let result = await PaymentCancelService(req);
    return res.status(200).json(result);
}

exports.PaymentIPN = async(req, res) => {
    let result = await PaymentIPNService(req);
    return res.status(200).json(result);
}

exports.InvoiceList = async(req, res) => {
    let result = await InvoiceListService(req);
    return res.status(200).json(result);
}

exports.InvoiceProductList = async(req, res) => {
    let result = await InvoiceProductListService(req);
    return res.status(200).json(result);
}