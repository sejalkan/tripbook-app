/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
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
                password: req.body.password,
                bio : req.body.bio,
                followers : req.body.followers,
                posts : req.body.posts,
                profilePicture: req.body.profilePicture }) //{data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), contentType: 'image/png'}});
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
        user.profilePicture = req.body.profilePicture;
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
        user.profilePicture = (req.body.profilePicture || user.profilePicture);
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
router.post('/userLogin', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if(err) {return next(err);} 
        if (user) {
            //incorrect password
            if (!req.body.password === user.password) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid credentials'
                });
            }
            let token = jwt.sign({ userId: user._id}, 'secretkey');
            return res.status(200).json({
                title: 'login sucess',
                token: token,
                user: user,
                userId : user._id
            });
        }
        else {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }
    });
});
router.get('/LoggedInUser', (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        });
        //token is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    username: user.username,
                    email: user.email_address,
                    followers: user.followers,
                    posts: user.posts,
                    bio: user.bio,
                    profilePicture: user.profilePicture
                }
            });
        });
    });
});

module.exports = router;