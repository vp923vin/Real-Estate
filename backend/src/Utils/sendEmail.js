const {transporter, gmail } = require('../Config/Email');
const path = require('path');
const ejs = require('ejs');
// const sendEmails = async (payload, templateFile) => {
//   console.log(process.cwd())
//     const emailTemplatePath = path.resolve(process.cwd(), 'src', 'Views', 'emails', templateFile);
//     const Html = await ejs.renderFile(emailTemplatePath, payload.userData);
//     const mailOptions = {
//       from: gmail,
//       to: payload.email,
//       subject: payload.subject,
//       html: Html,
//     }
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return false;
//       } else {
//         console.log('Email sent: ' + info.response);
//         return true;
//       }
//     });
  
// }

const sendEmails = (payload, templateFile) => {
  return new Promise((resolve, reject) => {
      const emailTemplatePath = path.resolve(process.cwd(), 'src', 'Views', 'emails', templateFile);
      ejs.renderFile(emailTemplatePath, payload.userData, (err, Html) => {
          if (err) {
              console.error(err);
              reject(err); 
              return;
          }
          const mailOptions = {
              from: gmail,
              to: payload.email,
              subject: payload.subject,
              html: Html,
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error(error);
                  reject(error); 
                  return;
              }
              console.log('Email sent: ' + info.response);
              resolve(info.response);
          });
      });
  });
};



// payload format 
// payload = {
//     email: email, // user whom you want to send email
//     subject: subject, // mail subject to send or reason for email
//     userData: {
//         // here user Imaportant data to send in email. and other data you can add 
//     }
// }

module.exports = {
    sendEmails
}