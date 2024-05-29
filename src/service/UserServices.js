const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const EmailSend = require("../utility/EmailHelper");
const {EncodeToken} = require('../utility/TokenHelper');

const UserOTPService = async (req) => {

    try {
        let email = req.params.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailText = `Your verification code is : ${code}`;
        let EmailSubject = 'Email Verification';

        await EmailSend(email,EmailText,EmailSubject);

        await UserModel.updateOne({
            email: email
        }, {
            $set:{
                otp:code
            }
        },{upsert:true});

        return {ststus: "success", message: "6 digit OTP send to your email."};
    
    } catch(err) {
        return {ststus: "fail", message: "Something wrong.".err};
    }

}

const VerifyOTPService = async (req) => {

    try {
        let email = req.params.email;
        let otp = req.params.otp;

        let total = await UserModel.find({email: email, otp: otp}).count('total');
        
        if(total === 1) {
            let user_id = await UserModel.find({
                email: email, otp: otp
            }).select('_id');

            let token = EncodeToken(email,user_id[0]['_id'].toString());
            
            await UserModel.updateOne({email: email}, {$set:{otp:"0"}});
            
            return {status: 'success', message: "Valid OTP", token: token};

        } else {
            return {status: 'fail', message: 'Invalid OTP'};
        }

    } catch (error) {
        return {status: 'fail', message: 'Something went wrong.', data: error};
    }
}

const SaveProfileService = async (req) => {

    try {
        let user = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user;

        await ProfileModel.updateOne({userID: user}, {$set:reqBody},{upsert:true})
        return {status: 'success', message: 'Profile Save Success.'};
    } catch (error) {
        return {status: 'fail', message: 'Something went wrong.', data: error};
    }
}


const ReadProfileService = async (req) => {

    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let result = await ProfileModel.find({userID: user_id});
        return {status: 'success', message: 'Profile Found.', data: result};
    } catch (error) {
        return {status: 'fail', message: 'Something went wrong.', data: error};
    }
}

module.exports = {
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    ReadProfileService
}