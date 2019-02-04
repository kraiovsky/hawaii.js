/**
 * @file Email sendouts client.
 * Uses nodemailer https://nodemailer.com/about/ and https://ethereal.email/ for capturing emails in development.
 */
const nodemailer = require('nodemailer')

/**
 * Connects to DynamoDB and creates a data model.
 * Depending on the environment, will connect to local or remote server.
 *
 * @param {object} message - A message object according to nodemail.
 * @param {object} smtpConfig - SMTP config object.
 *
 * @returns {Promise} Nodemailer status - an error or info with delivery status.
 */
module.exports = (message, smtpConfig) => {
  const transporter = nodemailer.createTransport({ ...smtpConfig })
  return transporter.sendMail(message)
}
