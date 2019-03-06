const Tag = require('../models/tag')
    , Controller = require('./controller')

module.exports = new Controller(Tag).all().router
