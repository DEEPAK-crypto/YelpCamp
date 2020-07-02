var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment = require("./models/comment"),
    User = require('./models/user'),
    seedDB = require('./seed');

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"))

//Passport config
app.use(require("express-session")({
    secret: "I am new to web development",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Root page
app.get("/", function(req, res) {
    res.render('campgrounds/landing');
});

//Shows all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camp: allcampgrounds });
    })


});

//Display new campground form 
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/show", { campground: foundCampground });
    });
});

// =========================================
//Comments 
// =========================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err)
            console.log(err);
        else
            res.render("comments/new", { campground: campground });
    })

})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err)
                    console.log(err);
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })

})

//Auth routes====================

app.get('/register', function(req, res) {
    res.render('register');
})

app.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    })
})

app.get('/login', function(req, res) {
    res.render('login');
})

app.post("/login", passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: "/login"
}), function(req, res) {});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login")
}

app.listen(3000);