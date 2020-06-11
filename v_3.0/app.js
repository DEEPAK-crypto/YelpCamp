var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    Campground = require('./models/campground')

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');



//Root page
app.get("/", function(req, res) {
    res.render('landing');
});

//Shows all campgrounds
app.get("/index", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("index", { camp: allcampgrounds });
    })


});

//Display new campground form 
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

//Add new campground to the database
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err)
            console.log(err);
        else
            res.render("show", { campground: foundCampground });
    });
});

app.listen(3000);