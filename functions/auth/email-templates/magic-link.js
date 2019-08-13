const tokenConfirmationUrl = 'auth/confirm'

module.exports = (token, webClientUrl) => ({
  subject: 'Login with one click',
  text: `Magic link: ${token}`,
  html: `<p>Click <b><a target="_blank" href="${webClientUrl}/${tokenConfirmationUrl}?token=${token}">here</a></b> to confirm your login`,
})
