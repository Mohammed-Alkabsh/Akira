var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
var Order = require("../models/orders.js");
var Product = require("../models/food.js");
var Cart = require("../models/cart.js");
var csrf = require("csurf");
var { check, validationResult } = require('express-validator/check');

var csrfProtection = csrf();
router.use(csrfProtection);

var links = [
  {
    title: "HOME", link: "/", isactive: true
  },
  {
    title: "ABOUT", link: "/about", isactive: false
  },
  {
    title: "MENU", link: "/menu", isactive: false
  },
  {
    title: "CONTACT", link: "/contact", isactive: false
  },
  {
    title: "USER", link: "/user/profile", isactive: false
  },
  {
    title: "CART", link: "/shopping-cart", isactive: false
  }
      
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("user/profile");
});





router.get("/profile", isLoggedIn, function(req, res){
    links.forEach(function(link){
        if( link.title === "USER"){
          link.isactive = true;
        }else{
          link.isactive = false;
        }
    });
    Order.find({user: req.user}, function(err, orders){
        if(err){
            req.flash("error", "We could not find your profile, please try again later..");
            res.redirect("back");
        }else{
            var cart;
            orders.forEach(function(order){
                cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            
            res.render("user/profile", {
                orders: orders,
                style: "/stylesheets/profile.css",
                script: "/javascripts/profile.js",
                links: links
            });
        }
    });
});

router.get("/signup", isLoggedout, function(req, res){
    links.forEach(function(link){
        if( link.title === "USER"){
          link.isactive = true;
        }else{
          link.isactive = false;
        }
    });
    res.render("user/signup", {
        csrfToken: req.csrfToken(),
        style: "/stylesheets/signup.css",
        script: "/javascripts/signup.js",
        links: links
        
    });
});

router.post("/signup", [
    check("email").isEmail(),
    check("password").isLength({ min: 5 })
    ],function(req, res){
    
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(function(message){
            req.flash("error", " invalid " + message.param + " ");
        });
        res.redirect("back");
        return;
    }
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            if(req.session.oldUrl){
                var oldUrl = req.session.oldUrl;
                req.session.oldUrl = null;
                req.flash("success", "You have successfully signed up as " + req.user.username);
                res.redirect(oldUrl);
            }else{
                req.flash("success", "You have successfully signed up as " + req.user.username);
                res.redirect("/");
            }
        });
    });
});

router.get("/login", isLoggedout, function(req, res){
    links.forEach(function(link){
        if( link.title === "USER"){
          link.isactive = true;
        }else{
          link.isactive = false;
        }
    });
    res.render("user/login", {
        csrfToken: req.csrfToken(),
        style: "/stylesheets/login.css",
        script: "/javascripts/login.js",
        links: links
        
    });
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        req.flash("success", "Welcome back " + req.user.username);
        res.redirect(oldUrl);
    }else{
        req.flash("success", "Welcome back " + req.user.username);
        res.redirect("/");
    }
});

router.get("/logout", isLoggedIn, function(req, res){
    req.logout();
    req.flash("success", "You are now logged out");
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/user/login");
    }
}

function isLoggedout(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect("back");
    }
}





module.exports = router;
