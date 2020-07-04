//Root page

var express = require("express");
var router = express.Router();
var Campground = require('../models/campground')

router.get("/", function(req, res) {
    res.render('campgrounds/landing');
});

//Shows all campgrounds
router.get("/campgrounds", function(req, res) {

    Campground.find({}, function(err, allcampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camp: allcampgrounds, currentUser: req.user });
    })


});

//Display new campground form 
router.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

//Add new campground to the database
router.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    Campground.create(newCampground, function(err, campground) {
        if (err)
            console.log(err);
    });
    res.redirect("/index");
});

//Shows campground description
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/show", { campground: foundCampground });
    });
});

module.exports = router;