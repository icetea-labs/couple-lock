var express = require('express')
  , router = express.Router()
  , Propose = require('../models/propose')

router.get('/:id', function(req, res) {
  Propose.get(req.params.id, function (err, data) {
    res.json(data)
  })
})

module.exports = router