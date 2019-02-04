const Joi = require('joi')

module.exports.RES_JSON_API_SCHEMA = dataObject => {
  return {
    jsonapi: Joi.object()
      .keys({
        version: Joi.string().required(),
      })
      .required(),
    links: Joi.object().keys({
      index: Joi.string(),
    }),
    meta: Joi.object(),
    included: Joi.object(),
    data: dataObject,
  }
}
