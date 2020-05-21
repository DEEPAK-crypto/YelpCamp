var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');


var camp = [
    { name: 'Salmon Creek', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=1.00xw:0.855xh;0,0.0384xh&resize=1200:*' },
    { name: "Granite hills", image: 'https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto' },
    { name: 'Salmon Creek', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=1.00xw:0.855xh;0,0.0384xh&resize=1200:*' },
    { name: "Granite hills", image: 'https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto' },
    { name: "Mountain Goat's Rest", image: 'https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg' },
    { name: 'Salmon Creek', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=1.00xw:0.855xh;0,0.0384xh&resize=1200:*' },
    { name: "Granite hills", image: 'https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto' },
    { name: "Mountain Goat's Rest", image: 'https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg' },
    { name: "Mountain Goat's Rest", image: 'https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg' }
];

app.get("/", function(req, res) {
    res.render('landing');
});

app.get("/campgrounds", function(req, res) {


    res.render("campgrounds", { camp: camp });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});


app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = { name: name, image: image }
    camp.push(newCamp);
    res.redirect("/campgrounds");
});

app.listen(3000);