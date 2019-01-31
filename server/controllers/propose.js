var express = require('express')
  , router = express.Router()
  , Propose = require('../models/propose')
  , route = require('../helpers/route')

  router.get('/details', async (req, res) => {
    route.tryJson(res, Propose.one, req.query.id);
  })
  
  router.get('/list', async (req, res) => {
    route.tryJson(res, Propose.list, req.query.username);
  })

module.exports = router