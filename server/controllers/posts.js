var express = require('express');
var router = express.Router();
var Post = require('../schemas/post.js');

router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err) {
        if(err) {return next(err);}
        res.status(201).json(post);
    });
});

router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if(err) {return next(err);}
        res.json({'posts' : posts});
    });
});

router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) {return next(err);}
        if(post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

router.put('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if(post == null) {
            return res.status(404).json({'message:' : 'Post not found'});
        }
        post.likes = req.body.likes;
        post.description = req.body.likes;
        post.user = req.body.user;
        post.place = req.body.place;
        post.save();
        res.json(post);
    });
});

router.patch('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) {return next(err);}
        if(post == null) {
            return res.status(404).json({'message' : 'Post not found'});
        }
        post.likes = (req.body.likes || post.likes);
        post.description = (req.body.description || post.description);
        post.user = (req.body.user || post.user);
        post.place = (req.body.place || post.place);
        post.save();
        res.json(post);
    });
});

router.delete('/posts', function(req, res, next) {
    Post.deleteMany(function(err, post) {
        if(err) { next(err);}
        res.json(post);
    });
});

router.delete('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findByIdAndDelete(id, function(err, post){
        if(err) {return next(err);} 
        if(post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});
module.exports = router;  