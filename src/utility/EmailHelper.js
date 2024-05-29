const nodemailer = require('nodemailer');

const EmailSend = async(EmailTo, EmailText, EmailSubject) => {

    let transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: '3ece2a052da422',
            pass: '00836d56a939e1'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOption = {
        from: "MERN Ecommerce Site <info@xyz.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }

    return transport.sendMail(mailOption);

}

module.exports = EmailSend;
