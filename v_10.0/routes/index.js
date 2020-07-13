//Auth routes====================
var express = require("express");
var router = express.Router();
var passport = require('passport')
var user = require('../models/user')

//Register user form
router.get('/register', function(req, res) {
    res.render('register');
})

//Register user request
router.post("/register", function(req, res) {
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

//Login user form
router.get('/login', function(req, res) {
    res.render('login');
})

//Login user request
router.post("/login", passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: "/login"
}), function(req, res) {});

//Logout user
router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
})


module.exports = router;