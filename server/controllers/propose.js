var Propose = require('../models/propose')
  , route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check')
  , Controller = require('./controller')

const upload = require('../helpers/upload');
const router = new Controller(Propose).details().list('username').router

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

  route.validateTryJson(req, res, validationResult, Propose.update, req.body.id, item)
})

router.get('/viewed', checkSchema({
  id: route.stringSchema(),
}), (req, res) => {

  const item = {
    viewed: true,
  }

  const batchUpdate = idArray => {
    return idArray.reduce((promises, i) => {
      promises.push(Propose.update(i, item))
      return promises
    }, [])
  }

  route.validateTryJson(req, res, validationResult, batchUpdate, id.split(';'), item);
})

module.exports = router