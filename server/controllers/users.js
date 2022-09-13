/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();

var User = require('../schemas/user');

router.post('/users', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if(err) {return next(err); }
        res.status(201).json(user);
    });
});

router.get('/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next;} 
        res.json({'users': users});
    });
});

router.get('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if(err) {return next(err);}
        res.json(user);
    });
});
/*
router.put('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        // not done
    });
});
*/
module.exports = router;