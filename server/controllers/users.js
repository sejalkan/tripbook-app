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

router.put('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.username = req.body.username;
        user.email_address = req.body.email_address;
        user.password = req.body.password;
        user.bio = req.body.bio;
        user.followers = req.body.followers;
        user.posts = req.body.posts;
        user.save();
        res.json(user);
    });
});

router.patch('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.username = (req.body.username || user.username);
        user.email_address = (req.body.email_address || user.email_address);
        user.password = (req.body.password || user.password);
        user.bio = (req.body.bio || user.bio);
        user.followers = (req.body.followers || user.followers);
        user.posts = (req.body.posts || user.posts);
        user.save();
        res.json(user);
    });
});

router.delete('/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

module.exports = router; 