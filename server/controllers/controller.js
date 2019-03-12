const route = require('../helpers/route')
  , { validationResult, checkSchema } = require('express-validator/check')

module.exports = class {

  constructor(m, r) {
    this.router = r || require('express').Router()
    this.model = m
  }

  details(keyName = 'id') {
    this.router.get('/details', checkSchema({ [keyName]: route.stringSchema() }), (req, res) => {
      route.validateTryJson(req, res, validationResult, this.model.one, req.query[keyName])
    })
    return this
  }

  list(prop, or) {
    this.router.get('/list', (req, res) => {
      route.validateTryJson(req, res, validationResult, this.model.list, prop ? req.query[prop] : req.query, !or)
    })
    return this
  }

  all() {
    this.router.get('/all', (req, res) => {
      route.tryJson(res, this.model.all)
    })
    return this
  }

  create(requiredField, method = 'post', prop) {
    this.router[method]('/create', checkSchema({
      [requiredField]: route.stringSchema((method === 'post') ? 'body' : 'query')
    }), (req, res) => {
      let item = (method === 'post') ? req.body : req.query
      if (prop) {
        item = item[prop]
      }
      route.validateTryJson(req, res, validationResult, this.model.insert, item)
    })
    return this
  }

  viewed(keyName = 'id') {
    this.router.get('/viewed', checkSchema({
      [keyName]: route.stringSchema(),
    }), (req, res) => {
    
      const item = {
        viewed: true,
      }
  
      const batchUpdate = idArray => {
        const promises = idArray.reduce((ps, i) => {
          ps.push(this.model.update(i, item))
          return ps
        }, [])
        return Promise.all(promises)
      }
    
      route.validateTryJson(req, res, validationResult, batchUpdate, req.query[keyName].split(';'), item);
    })
    return this
  }
}

