const Noti = require('../models/noti')
    , Controller = require('./controller')

module.exports = new Controller(Noti).details().list().viewed().router
