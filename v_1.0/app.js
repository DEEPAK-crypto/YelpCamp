var express = require("express");
var app = express();

app.set("view engine", 'ejs');

app.get("/", function(req, res) {
    res.render('landing');
});

app.get("/campgrounds", function(req, res) {
    var camp = [
        { name: 'Salmon Creek', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=1.00xw:0.855xh;0,0.0384xh&resize=1200:*' },
        { name: "Granite hills", image: 'https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto' },
        { name: "Mountain Goat's Rest", image: 'https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg' }
    ]

    res.render("campgrounds", { camp: camp });
});


app.listen(3000);