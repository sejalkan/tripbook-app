/* eslint-disable linebreak-style */
var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
const jwt = require('jsonwebtoken');
var Post = require('../schemas/post.js');

router.post('/users', function (req, res, next) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        });
        else if (user) return res.status(400).json({
            title: 'username already used',
        });
        else {
            var newUser = new User({
                email_address: req.body.email_address,
                username: req.body.username,
                password: req.body.password,
                bio: req.body.bio,
                followers: req.body.followers,
                posts: req.body.posts,
                profilePicture: req.body.profilePicture
            }); //{data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), contentType: 'image/png'}});
            console.log(newUser);
            newUser.save(function (err) {
                if (err) { return next(err); }
                res.status(201).json(newUser);
            });
        }
    });
});

router.get('/users', function (req, res, next) {
    User.find(function (err, users) {
        if (err) { return next; }
        res.json({ 'users': users });
    });
});

router.get('/users/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        res.json(user);
    });
});

router.put('/users/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ 'message': 'User not found' });
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

router.patch('/users/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ 'message': 'User not found' });
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

router.delete('/users/:id', function (req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        res.json(user);
    });
});
router.post('/userLogin', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) { return next(err); }
        if (user) {
            //incorrect password
            if (req.body.password !== user.password) {
                return res.status(401).json({
                    title: 'Wrong password',
                    error: 'Wrong password'
                });
            }
            let token = jwt.sign({ userId: user._id }, 'secretkey');
            return res.status(200).json({
                title: 'login success',
                token: token,
                user: user,
                userId: user._id
            });
        } else {
            return res.status(401).json({
                title: 'user not found',
                error: 'incorrect username'
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
            console.log(user._id);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    username: user.username,
                    email: user.email_address,
                    followers: user.followers,
                    posts: user.posts,
                    favPosts: user.favPosts,
                    bio: user.bio,
                    profilePicture: user.profilePicture,
                    id: user._id
                }
            });
        });
    });
});

router.post('/users/:id/posts', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            return next(err);
        }
        var post = new Post(req.body);
        post.save(function (err) {
            if (err) { return next(err); }
            console.log(post);
        });
        user.posts.push(post);
        user.save();
        console.log(post._id);
        return res.status(201).json(user);
    });
});

router.get('/users/:id/posts', function (req, res, next) {
    var id = req.params.id;
    User.findById(id).populate('posts').exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (user == null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        console.log(user.posts);
        return res.status(200).json(user.posts);
    });
});
router.post('/favPost/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            return next(err);
        }
        var post = req.body;
        if (user.favPosts.includes(post._id)) {
            console.log('no');
            const index = user.favPosts.indexOf(post);
            user.favPosts.splice(index, 1);
        } else {
            console.log('hey');
            user.favPosts.push(post);
        }

        user.save();
        console.log(post._id);
        return res.status(201).json(user);
    });
});

module.exports = router;