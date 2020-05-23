var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
    res.render('landing');
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds", { camp: allcampgrounds });
    })


});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});


app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    Campground.create(newCampground, function(err, campground) {
        if (err)
            console.log(err);
    });
    res.redirect("/campgrounds");
});

app.listen(3000);