const {transporter, gmail } = require('../Config/Email');

const sendEmails = async (payload, templateFile) => {
    const emailTemplatePath = path.resolve(process.cwd(), 'src', 'Views', 'emails', templateFile);
    const Html = await ejs.renderFile(emailTemplatePath, payload.userData);
    const mailOptions = {
      from: gmail,
      to: payload.email,
      subject: payload.subject,
      html: Html,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return false;
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  
}

// payload format 
// payload = {
//     email: email, // user whom you want to send email
//     subject: subject, // mail subject to send or reason for email
//     userData: {
//         // here user Imaportant data to send in email. and other data you can add 
//     }
// }

module.exports = {
    sendEmails,
}