const tokenConfirmationUrl = 'auth/confirm'

module.exports = (token, webClientUrl) => ({
  subject: 'Login with one click',
  text: `Magic link: ${token}`,
  html: `<p>Click <b><a href="${webClientUrl}/${tokenConfirmationUrl}?token=${token}">here</a></b> to confirm your login or enter the following token at <a href="${webClientUrl}/${tokenConfirmationUrl}">the confirmation page</a> manually:</p><p>${token}</p>`,
})
