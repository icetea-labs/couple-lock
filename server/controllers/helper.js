const route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check');

exports.details = (router, model, keyName = 'id') => {
    router.get('/details', checkSchema({ [keyName]: route.stringSchema() }), (req, res) => {
        route.validateTryJson(req, res, validationResult, model.one, req.query[keyName]);
      })
}

exports.list = (router, model, fKeyName) => {
    router.get('/list', checkSchema({ [fKeyName]: route.stringSchema() }), (req, res) => {
        route.validateTryJson(req, res, validationResult, model.list, req.query[fKeyName]);
      })
}

exports.create = (router, model, requiredField) => {
    router.post('/create', checkSchema({
        [requiredField]: route.stringSchema('body')
      }), (req, res) => {
          route.validateTryJson(req, res, validationResult, model.insert, req.body);
      })
}
