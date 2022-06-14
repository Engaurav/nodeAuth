const nodeMailer = require('../config/nodemailer');


exports.forgetLinkMailer = (recipient,link) => {

    nodeMailer.transporter.sendMail({
       from : process.env.NODEMAILER_EMAIL,
       to: recipient,
       subject : "Reset Link from Node_Auth",
       html : `<h1>Click on below link to reset your password</h1>
                <br><br><p>${link}</p>`
    }, (err,info) => {
        if(err){
            console.log("Error in Sending Mail",err);
            return;
        }
        console.log('Message Send')
        return;
    });
}