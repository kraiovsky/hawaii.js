Email client factory

## How to use
```javascript
// auth/controllers/auth.js
const email = require('@hawaii-js/email-client')

const sendMagicLink = () => async ctx => {
  const {
    config: { smtp: smtpConfig },
  } = ctx.state

  const magicLinkMsg = '...'

  try {
    await email(magicLinkMsg, smtpConfig)
  } catch (error) {
    ctx.throw(500, 'Sending email with magic link failed.', { error })
  }
}
```
