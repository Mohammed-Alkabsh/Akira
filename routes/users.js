var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
var Order = require("../models/orders.js");
var Review = require("../models/review.js");
var Product = require("../models/food.js");
var Cart = require("../models/cart.js");
var methodOverride = require("method-override");
var csrf = require("csurf");
var { check, validationResult } = require('express-validator/check');

var csrfProtection = csrf();
router.use(csrfProtection);

//Showing which page your on with the navigation menu
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




//Go to the users profile if they're logged in
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
            
            Review.find({author: {email: req.user.email, id: req.user._id, username: req.user.username}}, function(err, reviews){
                if(err){
                    req.flash("error", "Something went wrong while trying to find all your reviews");
                    res.redirect("back");
                }else{
                    res.render("user/profile", {
                        orders: orders,
                        csrfToken: req.csrfToken(),
                        reviews: reviews,
                        style: "/stylesheets/profile.css",
                        script: "/javascripts/profile.js",
                        links: links
                    });
                }
            });
        }
    });
});

//Go To Sign Up Page
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

//User Sign Up Functionality
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

//Go To Login Page
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

//User Login Functionality
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

//User Logout Functionality
router.get("/logout", isLoggedIn, function(req, res){
    req.logout();
    req.flash("success", "You are now logged out");
    res.redirect("/");
});

//Change User Email Functionality
router.post("/edit/email/:id", isLoggedIn, function(req, res){
    User.findOneAndUpdate({_id: req.params.id}, {email: req.body.newEmail}, function(err, user){
        if(err){
            req.flash("error", "" + err.name + " : " + err.message);
            res.redirect("back");
        }else{
            user.save();
            req.flash("success", "Your email has been successfully updated.");
            res.redirect("back");
        }
    });
    console.log(req.user);
});

//Change User Username Functionality
router.post("/edit/username/:id", isLoggedIn, function(req, res){
    
    User.findOneAndUpdate({_id: req.params.id}, {username: req.body.newUsername}, function(err, user){
        if(err){
            req.flash("error", "" + err.name + " : " + err.message);
            res.redirect("back");
        }else{
            user.save();
            req.flash("success", "Your username has been successfully updated, log back in with your new username to access your account.");
            res.redirect("/user/login");
        }
    });
});

//Change User Password Functionality
router.post("/edit/password/:id", isLoggedIn, function(req, res){
    var oldPassword = req.body.oldPassword,
        newPassword = req.body.newPassword,
        confirmPassword = req.body.confirmPassword;
        
    User.findById(req.user._id, function(err, user){
        if(err){
            req.flash("error", "" + err.name + " : " + err.message);
            res.redirect("back");
        }else{
            if( newPassword === confirmPassword ){
                user.changePassword(oldPassword, newPassword, function(err, result){
                    if(err){
                        req.flash("error", "" + err.name + " : " + err.message);
                        res.redirect("back");
                    }else{
                        req.flash("success", "Your password has been changed.");
                        res.redirect("back");
                    }
                });
            }else{
                req.flash("error", "" + err.name + " : " + err.message);
                res.redirect("back");
            }
            
        }
    });
});

//Delete User Account Functionality
router.post("/delete/:id", isLoggedIn, function(req, res){
    User.findOneAndDelete({_id: req.params.id}, function(err, result){
        if(err){
            req.flash("error", "" + err.name + " : " + err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Your account is now deleted");
            res.redirect("/");
        }
    });
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
