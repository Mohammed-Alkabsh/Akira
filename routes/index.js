var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var Food = require("../models/food.js");
var Cart = require("../models/cart.js");
var Order = require("../models/orders.js");
var Review = require("../models/review.js");
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
  Food.find({}).populate("reviews").exec(function(err, products){
      if(err){
          req.flash("error", "" + err.name + " : " + err.message);
          res.redirect("back");
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

router.post("/contact", function(req, res){
  var name = req.body.name,
      email = req.body.email,
      phone = req.body.phone,
      message = req.body.message;
      
  const output = `
    <p>You have a new contact</p>
    <h3>Contact Details:</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
    </ul>
    <h4>Message: </h4>
    <p>${message}</p>
    `;
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USERMAIL, // generated ethereal user
          pass: process.env.MAILPASS // generated ethereal password
        }
    });
    
    let mailOptions = {
        from: '"Marcs Fusion Cafe Email" <' + process.env.SENDER + '>', // sender address
        to: process.env.SENDER, // list of receivers
        subject: "New Message From Restaurant Website", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            req.flash("error", "We're sorry but your message wasn't sent properly");
            res.redirect("/");
            return console.log(err);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        req.flash("success", "Your message has been sent and we will contact you soon!");
        res.redirect("/");
    });
      
  
})


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
        req.flash("success", "Your item is saved!");
        res.redirect("/menu");
      }
    });
});

router.get("/add/item/:id", function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});
  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect("back");
});

router.get("/reduce/item/:id", function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("back");
});

router.get("/remove/item/:id", function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("back");
});

router.get("/leave-review/:id", isLoggedIn, function(req, res){
  req.flash("success", "Sorry for the delay, but now that your logged in, you can go back and leave your review.");
  res.redirect("/menu");
});

router.post("/leave-review/:id", isLoggedIn, function(req, res){
  console.log(req.body.star);
  Food.findById(req.params.id, function(err, food){
    if(err){
      req.flash("error", "Could not find that food item");
      res.redirect("back");
    }else{
      Review.create({
        text: req.body.comment,
        stars: req.body.star,
        ITitle: req.body.ititle,
        IImage: req.body.iimage,
        IDescription: req.body.idescription,
        IPrice: req.body.iprice
      }, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong while trying to save your review");
          res.redirect("back");
        }else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.author.email = req.user.email;
          comment.save();
          food.reviews.push(comment);
          food.save();
          req.flash("success", "Your review is saved!");
          res.redirect("/menu");
          console.log(comment);
        }
      });
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
  if(!req.session.cart || req.session.cart.totalQty === 0){
    return res.render("shopping-cart", {
      products: null,
      style: "/stylesheets/shopping-cart.css",
      script: "/javascripts/shopping-cart.js",
      links: links
      
    });
  }
  var cart = new Cart(req.session.cart);
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
  
  var stripe = require("stripe")(process.env.STRIPEKEY);
  
  stripe.charges.create({
    amount: Math.round(cart.totalPrice.toFixed(2)) * 100,
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



//=======================================EDIT AND DELETE REVIEWS ROUTES===========================================

router.post("/review/edit/:id", function(req, res){
    Review.findById(req.params.id, function(err, review){
        if(err){
            req.flash("error", "Sorry we could not find that review");
            res.redirect("back");
        }else{
            review.text = req.body.comment;
            review.stars = req.body.star;
            review.save();
            req.flash("success", "your review has been updated.");
            res.redirect("back");
        }
    });
});
router.post("/review/delete/:id", function(req, res){
    Review.findOneAndDelete({_id: req.params.id}, function(err, review){
        if(err){
            req.flash("error", "We're sorry but we couldn't delete your review at this time.");
            res.redirect("back");
        }else{
            req.flash("success", "Your review has been deleted");
            res.redirect("back");
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

