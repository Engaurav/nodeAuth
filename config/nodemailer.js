const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



//for sending emails
let transporter = nodeMailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user: process.env.NODEMAILER_EMAIL,
        pass : process.env.NODEMAILER_PASSWORD
    }
});

//for rendering emails of html type
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering template",err); 
                return;
            }
            mailHTML = template;
        });
    return mailHTML;
}



// exporting module
module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate,
}