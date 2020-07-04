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

//Edit campgrounds
router.get("/campgrounds/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err)
            res.redirect("/campgrounds")
        else
            res.render('campgrounds/edit', { campground: foundCampground })

    })
});
//update route
router.put("/campgrounds/:id", function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err)
            res.redirect('/campgrounds')
        else
            res.redirect("/campgrounds/" + req.params.id)
    })
})


//Display new campground form 
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Add new campground to the database
router.post("/campgrounds", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        username: req.user.username,
        id: req.user._id
    }
    var newCampground = { name: name, image: image, description: description, author: author };
    Campground.create(newCampground, function(err, campground) {
        if (err)
            console.log(err);

    });
    res.redirect("/campgrounds");
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login")
}

module.exports = router;