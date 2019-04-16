var MyModel = require('../models/user-model')
, express = require ('express');

module.exports =  class {
    constructor(r, m){
        this.route = r || require('express').Router;
        this.model = m ;
    }
    

}

