const express = require('express')
    , router = express.Router()
    , Noti = require('../models/noti')
    , route = require('../helpers/route')
    , { validationResult, checkSchema } = require('express-validator/check');

router.get('/details', checkSchema({ id: route.stringSchema() }), (req, res) => {
    route.validateTryJson(req, res, validationResult, Noti.one, req.query.id);
})

router.get('/list', checkSchema({ username: route.stringSchema() }), (req, res) => {
    route.validateTryJson(req, res, validationResult, Noti.list, req.query.username);
})

router.post('/create', checkSchema({
    username: route.stringSchema('body')
}), (req, res) => {
    route.validateTryJson(req, res, validationResult, Noti.insert, req.body);
})

router.get('/viewed', checkSchema({
    id: route.stringSchema(),
}), (req, res) => {

    const item = {
        viewed: true
    }

    route.validateTryJson(req, res, validationResult, Noti.update, req.query.id, item);
})

module.exports = router