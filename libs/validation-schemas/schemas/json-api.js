const Joi = require('@hapi/joi')

module.exports.RES_JSON_API_SCHEMA = (dataObject, dependencyObject = {}) => {
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
    included: Joi.array().items(dependencyObject),
    data: dataObject,
  }
}
