var express = require('express')
  , router = express.Router()
  , Memory = require('../models/memory')

router.get('/:id', function(req, res) {
  Memory.all(req.params.id, function (err, data) {
    res.json(data)
  })
})

module.exports = router