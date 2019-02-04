module.exports = token => ({
  subject: 'Login with one click',
  text: `Magic link: ${token}`,
  html: `<p>Magic link: <b>${token}</b></p>`,
})
