var express = require('express')
  , router = express.Router()
  , Memory = require('../models/memory')
  , route = require('../helpers/route')

router.get('/details', (req, res) => {
  route.tryJson(res, Memory.one, req.query.id);
})

router.get('/list', (req, res) => {
  route.tryJson(res, Memory.list, req.query.proposeId);
})

module.exports = router