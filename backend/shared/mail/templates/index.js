const { welcomeEmail } = require('./welcome');
const { otpEmail } = require('./otp');
const { inspectionEmail } = require('./inspection');
const { paymentEmail } = require('./payment');
const { verifyEmailTemplate } = require('./verifyEmail');
const { resetPasswordTemplate } = require('./resetPassword');

module.exports = {
  welcomeEmail,
  otpEmail,
  inspectionEmail,
  paymentEmail,
  verifyEmailTemplate,
  resetPasswordTemplate,
};
