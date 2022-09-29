var express = require('express');
const Place = require('../schemas/place.js');
var router = express.Router();
const jwt = require('jsonwebtoken');

//create new place
router.post('/places', function(req, res, next) {
    Place.findOne({username: req.body.username}, (err, place) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        });
        else if(place) return res.status(400).json({
            title: 'username already used',
        });
        else {
            var newPlace = new Place(req.body);
            console.log(newPlace);
            newPlace.save(function(err) {
                if (err) { return next(err); }
                res.status(201).json(newPlace);
            });
        }
    });
   
});

//get all places
router.get('/places', function(req, res, next) {
    Place.find(function(err, places){
        if (err) { return next(err); }
        res.json({'places':places});
    });
});

//get place by ID
router.get('/places/:id', function(req, res, next){
    var id = req.params.id;
    Place.findById({_id: id}, function(err, place){
        if (err) { return next(err); }
        if (place == null) {
            return res.status(404).json({'message':'Place not found'});
        }
        res.json(place);
    });
});

//delete multiple place
router.delete('/places', function(req, res, next) {
    Place.deleteMany(function(err, place){
        if (err) { return next(err); }
        res.json(place);
    });
});

//delete place by ID
router.delete('/places/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findOneAndDelete(id, function (err, place) {
        if (err) { return next (err); }
        if (place == null) {
            return res.status(404).json({'message':'Place not found'});
        }
        res.json(place);
    });
});

//Update place by id
router.put('/places/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findById(id, function(err, place){
        if (err) { return next(err); }
        if (place == null) {
            return res.status(404).json({'message':'Place not found'});
        }
        place.placeType = req.body.placeType;
        place.email_address = req.body.email_address;
        place.password = req.body.password;
        place.bio = req.body.bio;
        place.place_id = req.body.place_id;
        place.placeName = req.body.placeName;
        place.address = req.body.address;
        place.save();
        res.json(place);
    });

});
router.post('/placeLogin', (req, res, next) => {
    Place.findOne({ username: req.body.username }, (err, place) => {
        if(err) {return next(err);}
        if (place) {
            //incorrect password
            if (!req.body.password === place.password) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid credentials'
                });
            }
            let token = jwt.sign({ placeId: place.id}, 'secretkey');
            return res.status(200).json({
                title: 'login sucess',
                token: token
            });
        }
        else {
        //IF ALL IS GOOD create a token and send to frontend
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }
    });
});

module.exports = router;

/*
(a) POST /camels        --
(b) GET /camels         --
(c) DELETE /camels      --
(d) GET /camels/:id     --
(e) PUT /camels/:id     --
(f) PATCH /camels/:id
(g) DELETE /camels/:id  --
*/
