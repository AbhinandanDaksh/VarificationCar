const { sendMail } = require('./mailer');
const templates = require('./templates');

module.exports = {
  sendMail,
  templates,
};
