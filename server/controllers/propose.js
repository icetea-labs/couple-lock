var express = require('express')
  , router = express.Router()
  , Propose = require('../models/propose')
  , route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check');

  const upload = require('../helpers/upload');

  router.get('/details', checkSchema({
    id: route.stringSchema(),
  }), (req, res) => {
    route.validateTryJson(req, res, validationResult, Propose.one, req.query.id);
  })
  
  router.get('/list', (req, res) => {
    route.tryJson(res, Propose.list, req.query.username);
  })

  router.post('/request', upload.single("attachment"), checkSchema({
    sender: route.stringSchema('body'),
    receiver: route.stringSchema('body'),
    message: route.stringSchema('body')
  }), (req, res) => {
  
    const item = {
      visibility: req.body.visibility || 1,
      sender: req.body.sender,
      s_timestamp: req.body.timestamp || Date.now(),
      s_message: req.body.message,
      s_attachments: [],
      receiver: req.body.receiver
    }
  
    if (!req.file) {
      console.log("No file uploaded");
    } else {
      //console.log(req.file);
      item.s_attachments.push({
        type: 'photo',
        url: "/uploads/" + req.file.filename,
      })
    }
  
    route.validateTryJson(req, res, validationResult, Propose.insert, item);
  })

  router.post('/reply', upload.single("attachment"), checkSchema({
    id: route.stringSchema('body'),
    react: route.intSchema('body'),
    message: route.stringSchema('body')
  }), (req, res) => {
  
    const item = {
      r_timestamp: req.body.timestamp || Date.now(),
      r_react: req.body.react,
      r_message: req.body.message,
      r_attachments: []
    }
  
    if (!req.file) {
      console.log("No file uploaded");
    } else {
      //console.log(req.file);
      item.r_attachments.push({
        type: 'photo',
        url: "/uploads/" + req.file.filename,
      })
    }

    console.log(item);
  
    route.validateTryJson(req, res, validationResult, Propose.update, req.body.id, item);
  })

  router.get('/viewed', checkSchema({
    id: route.stringSchema(),
  }), (req, res) => {
  
    const item = {
      viewed: true,
    }
  
    route.validateTryJson(req, res, validationResult, Propose.update, req.query.id, item);
  })

module.exports = router