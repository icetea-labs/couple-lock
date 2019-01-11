const express = require('express')
  , router = express.Router()
  , Memory = require('../models/memory')
  , route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check');

router.get('/details', checkSchema({id: route.stringSchema()}), (req, res) => {
  route.validateTryJson(req, res, validationResult, Memory.one, req.query.id);
})

router.get('/list', checkSchema({proposeId: route.stringSchema()}), (req, res) => {
  route.validateTryJson(req, res, validationResult, Memory.list, req.query.proposeId);
})

router.post('/create', checkSchema({
  proposeId: route.stringSchema('body'),
  message: route.stringSchema('body')
}), (req, res) => {
  route.validateTryJson(req, res, validationResult, Memory.insert, {
      proposeId: req.body.proposeId,
      visibility: req.body.visibility || 1,
      timestamp: Date.now(),
      sender: "tradatech",
      message: req.body.message,
      attachments: []
  });
})

module.exports = router