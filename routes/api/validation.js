const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: true,
  }),
  phone: Joi.number().integer().positive().required(),
})

const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(2).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: true,
  }),
  phone: Joi.number().integer().positive(),
}).min(1)

const schemaFavoriteStatus = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemaContactID = Joi.object({
  contactId: Joi.objectId().required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    const value = await schema.validateAsync(obj)
    next()
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${err.message.replace(/"/g, '')}`,
    })
  }
}

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaFavoriteStatus, req.body, res, next)
}

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactID, req.params, res, next)
}
