var express = require('express');
var router = express.Router();
var Post = require('../schemas/post.js');
var Review = require('../schemas/review.js');
var User = require('../schemas/user.js');

//create post by user id
router.post('/users/:id/posts', function(req, res, next) {
    var id= req.params.id;
    User.findById(id, function(err,user){
        if(err) {return next(err);}
        if (user == null){
            return res.status(404).json({'message' : 'User not found'});
        }
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) { return next(err); }
        console.log(post);}
    );
    user.posts.push(post);
    user.save;
    return res.json(user.post)
}); 
});

//read all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) { return next(err); }
        res.json({'posts' : posts});
    });
});

//read by ID
router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

//update by ID
router.put('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
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
        if (err) { return next(err); }
        if (post == null) {
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

//delete multiple
router.delete('/posts', function(req, res, next) {
    Post.deleteMany(function(err, post) {
        if (err) { next(err); }
        res.json(post);
    });
});

//delete by ID
router.delete('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findByIdAndDelete(id, function(err, post){
        if (err) { return next(err); } 
        if (post == null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

//create review for a post
router.post('/posts/:id/reviews', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post){
        if (err) { 
            return next(err); 
        }
        var review = new Review(req.body);
        review.save(function (err){
            if (err) { return next (err); }
            console.log(review);
        });
        post.reviews.push(review);
        post.save();
        return res.status(201).json(post);
    });
});

//read reviews for a post by ID
router.get('/posts/:id/reviews', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id).populate("reviews").exec(function(err,post){
        if (err) {
            return next(err); 
        }
        if(post == null){
            return res.status(404).json({"message" : "Post not found"})
        }
        console.log(post.reviews);
        return res.status(200).json(post.reviews);
    });
});

//read a review by ID for a post by ID
router.get('/posts/:id/reviews/:r_id', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id).populate({path: 'reviews', match: {_id:req.params.r_id} }).exec(function (err, post) {
        if (err) {
            return next(err);
        }
        console.log(post.reviews);
        return res.status(200).json(post.reviews);
    });
});

//delete a review by ID for a post by ID
router.delete('/posts/:id/reviews/:r_id', function (req, res, next) {
    Review.findOneAndDelete({_id: req.params.r_id}, function (err, review) {
        if (err) {
            return next(err);
        }
        if (review == null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        Post.findByIdAndUpdate({_id: req.params.id}, {$pull: {reviews: req.params.r_id}}, function (err, post) {
            if (err) {
                return next(err);
            }
            return res.status(200).json(post.reviews);
        });
    });
});

module.exports = router;  

/*
✔️(a) POST /camels 
✔️(b) GET /camels 
✔️(c) DELETE /camels 
✔️(d) GET /camels/:id 
✔️(e) PUT /camels/:id 
✔️(f) PATCH /camels/:id 
✔️(g) DELETE /camels/:id 
*/

/*
✔️(a) POST /cars/:car_id/drivers
✔️(b) GET /cars/:car_id/drivers
✔️(c) GET /cars/:car_id/drivers/:driver_id
✔️(d) DELETE /cars/:car_id/drivers/:driver_id
*/