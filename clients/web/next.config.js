const config = require('./config')
const { s3BucketUrl } = config()

module.exports = {
  assetPrefix: s3BucketUrl,
}
