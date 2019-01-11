var express = require('express')
  , router = express.Router()

router.use('/api/user', require('./user'))
router.use('/api/propose', require('./propose'))
router.use('/api/memory', require('./memory'))

router.get('/api', function(req, res) {
  res.send(`<h3>API list</h3>
  <ul>
    <li>
        <a href='/api/user/details?username=tradatech'>/api/user/details?username=tradatech</a>
    </li>
    <li>
        <a href='/api/user/all'>/api/user/all</a>
    </li>
    <li>
        <a href='/api/propose/details?id=0'>/api/propose/details?id=0</a>
    </li>
    <li>
        <a href='/api/propose/list?username=tradatech'>/api/propose/list?username=tradatech</a>
    </li>
    <li>
        <a href='/api/memory/details?id=0'>/api/memory/details?id=0</a>
    </li>
    <li>
        <a href='/api/memory/list?proposeId=0'>/api/memory/list?proposeId=0</a>
    </li>
  </ul>`
  );
})

module.exports = router