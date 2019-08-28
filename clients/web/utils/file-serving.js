import config from '../config'
const { s3BucketUrl } = config()

export default file => s3BucketUrl + file
