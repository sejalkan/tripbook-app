var express = require('express');
var router = express.Router();
var Review = require('../schemas/review.js');

//create review
router.post('/reviews', function(req, res, next) {
    var review = new Review(req.body);
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    });
});

//read all reviews sorted
router.get('/sortedReviews', function(req, res, next) {
    const query = Review.find();
    query.sort({ rating: 1});
    query.exec((err, reviews) => {
        if (err) { return next(err); }
        res.json({'reviews':reviews});
    });
});

//read all reviews
router.get('/reviews', function(req, res, next) {
    Review.find(function(err, reviews){
        if (err) { return next(err); }
        res.json({'reviews': reviews});
    });
});

//read by ID
router.get('/reviews/:id', function(req, res, next){
    var id = req.params.id;
    Review.findById({_id: id}, function(err, review){
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json({'message':'Review not found'});
        }
        res.json(review);
    });
});

//delete multiple
router.delete('/reviews', function(req, res, next) {
    Review.deleteMany(function(err, review){
        if (err) { return next(err); }
        res.json(review);
    });
});

//delete by ID
router.delete('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findOneAndDelete(id, function (err, review) {
        if (err) { return next (err); }
        if (review == null) {
            return res.status(404).json({'message':'Review not found'});
        }
        res.json(review);
    });
});

//update by ID
router.put('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review){
        if (err) { return next(err); }
        if (review == null) {
            return res.status(404).json({'message':'Review not found'});
        }
        review.review_id = req.body.review_id;
        review.rating = req.body.rating;
        review.text = req.body.text;
        review.save();
        res.json(review);
    });

});

module.exports = router;    

/*
✔️(a) POST /camels
✔️(b) GET /camels
✔️(c) DELETE /camels
✔️(d) GET /camels/:id
✔️(e) PUT /camels/:id
(f) PATCH /camels/:id 
✔️(g) DELETE /camels/:id
*/