/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
//var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/users', function(req, res, next) {
    User.findOne({ username: req.body.username}, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        });
        else if(user) return res.status(400).json({
            title: 'username already used',
        }); 
        else {
            var newUser = new User ({
                email_address: req.body.email_address,
                username: req.body.username,
                // password: bcrypt.hashSync(req.body.password, 10),
                password: req.body.password,
                bio : req.body.bio,
                followers : req.body.followers,
                posts : req.body.posts});
            console.log(newUser);
            newUser.save(function(err) {
                if (err) { return next(err); }
                res.status(201).json(newUser);
            }); }
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
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {return next(err);}
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }
        //incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                tite: 'login failed',
                error: 'invalid credentials'
            });
        }
        //IF ALL IS GOOD create a token and send to frontend
        let token = jwt.sign({ userId: user._id}, 'secretkey');
        return res.status(200).json({
            title: 'login sucess',
            token: token
        });
    });
});

module.exports = router;