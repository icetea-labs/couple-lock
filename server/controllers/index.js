var express = require('express')
  , router = express.Router()

router.use('/api/propose', require('./propose'))
router.use('/api/memory', require('./memory'))

router.get('/api', function(req, res) {
  res.send(`<h3>API list</h3>
  <ul>
    <li>
        <a href='/api/propose/1'>/api/propose/:propose-id</a>
    </li>
    <li>
        <a href='/api/memory/1'>/api/memory/:propose-id</a>
    </li>
  </ul>`
  );
})

module.exports = router