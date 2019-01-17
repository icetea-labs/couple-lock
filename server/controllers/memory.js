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

router.post('/create', (req, res) => {
  //console.log('body', req.body);
  //console.log("query", req.query)
  route.validateTryJson(req, res, validationResult, Memory.insert, {
      proposeId: req.query.proposeId,
      visibility: req.query.visibility || 1,
      timestamp: req.query.timestamp || Date.now(),
      sender: req.query.sender,
      message: req.query.message,
      attachments: []
  });
})

module.exports = router