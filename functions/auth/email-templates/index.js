const shared = require('./shared')
const magicLink = require('./magic-link')

module.exports = {
  MAGIC_LINK: (fromName, fromEmail, toEmail, token, webClientUrl) => ({
    ...shared(fromName, fromEmail, toEmail),
    ...magicLink(token, webClientUrl),
  }),
}
