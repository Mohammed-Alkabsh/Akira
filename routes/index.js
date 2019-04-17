var express = require('express');
var router = express.Router();
var Food = require("../models/food.js");
var Cart = require("../models/cart.js");
var Order = require("../models/orders.js");
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

/* GET home page. */
router.get('/', function(req, res) {
  links.forEach(function(link){
    if( link.title === "HOME"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
  res.render('index', {
    style: "/stylesheets/index.css",
    script: "/javascripts/index.js",
    links: links
  });
});

router.get("/about", function(req, res){
  links.forEach(function(link){
    if( link.title === "ABOUT"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
    res.render("about", {
      style: "/stylesheets/about.css",
      script: "/javascripts/about.js",
      links: links
    });
});

router.get('/menu', function(req, res) {
  links.forEach(function(link){
    if( link.title === "MENU"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
  Food.find({}, function(err, products){
      if(err){
          console.log(err);
      }else{
          res.render("menu", {
            products: products,
            style: "/stylesheets/menu.css",
            script: "/javascripts/menu.js",
            links: links
          });
      }
  });
});

router.get("/contact", function(req, res){
  links.forEach(function(link){
    if( link.title === "CONTACT"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
    res.render("contact", {
      style: "/stylesheets/contact.css",
      script: "/javascripts/contact.js",
      links: links
    });
});


router.get("/add-to-cart/:id", function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    
    Food.findById(productId, function(err, result){
      if(err){
        req.flash("success", "That product could not be found");
        res.redirect("back");
        return;
      }else{
        cart.add(result, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        req.flash("success", "Your item is saved!");
        res.redirect("/menu");
      }
    });
});

router.get("/shopping-cart", function(req, res){
  links.forEach(function(link){
    if( link.link === "/shopping-cart"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
  if(!req.session.cart){
    return res.render("shopping-cart", {
      products: null,
      style: "/stylesheets/shopping-cart.css",
      script: "/javascripts/shopping-cart.js",
      links: links
      
    });
  }
  var cart = new Cart(req.session.cart);
  console.log(cart.generateArray());
  res.render("shopping-cart", {
    products: cart.generateArray(), 
    totalPrice: cart.totalPrice,
    style: "/stylesheets/shopping-cart.css",
    script: "/javascripts/shopping-cart.js",
    links: links
  });
});

router.get("/checkout", isLoggedIn, function(req, res){
  links.forEach(function(link){
    if( link.link === "/shopping-cart"){
      link.isactive = true;
    }else{
      link.isactive = false;
    }
  });
  if(!req.session.cart){
    res.redirect("shopping-cart", {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render("checkout", {
    total: cart.totalPrice,
    style: "/stylesheets/checkout.css",
    script: "/javascripts/checkout.js",
    links: links
    
  });
});

router.post("/checkout", isLoggedIn, function(req,res){
  console.log(req.body.stripeToken);
  if(!req.session.cart){
    res.redirect("shopping-cart", {products: null});
  }
  var cart = new Cart(req.session.cart);
  
  var stripe = require("stripe")("sk_test_fTrCR1YxeaiRc3k4Os8S0JOa");
  
  stripe.charges.create({
    amount: Math.round(cart.totalPrice) * 100,
    currency: 'usd',
    description: 'Customer charge',
    source: req.body.stripeToken,
  }, function(err, charge){
    if(err){
      req.flash("error", err.message);
      res.redirect("/checkout");
    }else{
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id
      });
      order.save(function(err, result){
        if(err){
          req.flash("error", "Something wrong happened while saving your order");
          res.redirect("/checkout");
        }else{
          req.flash("success", "Thank you for shopping with us!");
          req.session.cart = null;
          res.redirect("/");
        }
      });
    }
  });
});
module.exports = router;


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      req.session.oldUrl = req.url;
      res.redirect("/user/login");
    }
}
