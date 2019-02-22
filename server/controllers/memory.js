const express = require('express')
  , router = express.Router()
  , Memory = require('../models/memory')
  , route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check');

const upload = require('../helpers/upload');

router.get('/details', checkSchema({ id: route.stringSchema() }), (req, res) => {
  route.validateTryJson(req, res, validationResult, Memory.one, req.query.id);
})

router.get('/list', checkSchema({ proposeId: route.stringSchema() }), (req, res) => {
  route.validateTryJson(req, res, validationResult, Memory.list, req.query.proposeId);
})

router.post('/create', upload.single("attachment"), checkSchema({
  proposeId: route.stringSchema('body'),
  sender: route.stringSchema('body'),
  message: route.stringSchema('body')
}), (req, res) => {

  const item = {
    proposeId: req.body.proposeId,
    visibility: req.body.visibility || 1,
    timestamp: req.body.timestamp || Date.now(),
    sender: req.body.sender,
    message: req.body.message,
    attachments: [] || null,
  }

  if (!req.file) {
    console.log("No file uploaded");
  } else {
    //console.log(req.file);
    item.attachments.push({
      type: 'photo',
      url: "/uploads/" + req.file.filename,
    })
  }

  route.validateTryJson(req, res, validationResult, Memory.insert, item);
})

module.exports = router