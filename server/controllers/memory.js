const Memory = require('../models/memory')
  , route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check')
  , Controller = require('./controller')

const upload = require('../helpers/upload');
const router = new Controller(Memory).details().list().router

router.post('/create', upload.single("attachment"), checkSchema({
  proposeId: route.stringSchema('body'),
  sender: route.stringSchema('body'),
  //message: route.stringSchema('body')
}), (req, res) => {

  if (!req.body.message && !req.file && !req.body.locationName) {
    return res.status(400).send('Memory must have a message or attachment.');
  }

  const item = {
    proposeId: req.body.proposeId,
    visibility: req.body.visibility || 1,
    timestamp: req.body.timestamp || Date.now(),
    sender: req.body.sender,
    message: req.body.message,
    attachments: [] || null,
  }

  if (req.body.tags) {
    const tags = req.body.tags.split(';')
    if (tags.length) {
      item.tags = tags
    }
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

  if (req.body.locationName) {
    item.attachments.push({
      type: 'location',
      name: req.body.locationName,
      lat: req.body.locationLat,
      long: req.body.locationLong
    })
  }

  route.validateTryJson(req, res, validationResult, Memory.insert, item);
})

module.exports = router