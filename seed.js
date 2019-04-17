var mongoose = require("mongoose");
var Food = require("./models/food.js");


//Mongoose Connect
mongoose.connect("mongodb://localhost/sushibar", {useNewUrlParser: true});

var menu = {
    breakfast: [
        {
            title: "Tamago Kake Gohan",
            type: "breakfast",
            image: "https://lasvegas-sushi.com/wp-content/uploads/2018/03/bigstock-Tamago-Kake-Gohan-Or-Tamago-Go-226464919-845x675.jpg",
            price: 2.99,
            description: "It is a special breakfast meal that delivers both protein and carbohydrate in the same bowl. The steamed rice is topped with a raw egg and soy sauce seasoning together with salt. It is not only delicious but also easy to prepare."
        },
        {
            title: "Natto",
            type: "breakfast",
            image: "https://lasvegas-sushi.com/wp-content/uploads/2018/03/bigstock-Tamago-Kake-Gohan-Or-Tamago-Go-226464919-845x675.jpg",
            price: 3.99,
            description: "The fermented soybeans are a staple Japanese breakfast food. The protein-rich food is an acquired taste as it is very aromatic and stringy. Made with Spicy mustard (karashi), dried bonito shavings, seasoned seaweed (kizami nori) and chopped green onions."
        },
        {
            title: "Gyudon",
            type: "breakfast",
            image: "https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic_item/image/58518/retina_Gyudon_with_an_egg.jpg",
            price: 3.99,
            description: "A lot of people on the run will simply catch a bowl of gyudon (beef and onions over rice) or a bowl of ramen."
        },
        {
            title: "Onigiri",
            type: "breakfast",
            image: "https://www.theartfulappetite.com/wp-content/uploads/2018/05/Umeboshi-Onigiri-pickled-plum-rice-balls-The-Artful-Appetite-7.jpg",
            price: 5.99,
            description: "White rice formed into triangular or cylindrical shapes, stuffed with our signature tuna fish and wrapped in a nori sheet (seaweed)."
        },
        {
            title: "Samurai's Plate",
            type: "breakfast",
            image: "https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic_item/image/58516/retina_Japanese_breakfast.jpg",
            price: 5.99,
            description: "Bowl of rice, miso soup, any choice of the following: fish, grilled eggs, tofu natto or fermented soybeans), vegetables (one or a combination of fresh salad, pickles, or tsukudani or simmered vegetables)."
        }
    ],
    lunch:[
        {
            title: "Samurai's Plate",
            type: "lunch",
            image: "https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic_item/image/58516/retina_Japanese_breakfast.jpg",
            price: 5.99,
            description: "Bowl of rice, miso soup, any choice of the following: fish, grilled eggs, tofu natto or fermented soybeans), vegetables (one or a combination of fresh salad, pickles, or tsukudani or simmered vegetables)."
        },
        {
            title: "Korean beef Kabab",
            type: "lunch",
            image: "https://www.seriouseats.com/images/2016/04/20160423-skewer-recipes-roundup-02.jpg",
            price: 9.99,
            description: "These tender and juicy Korean Beef Kabobs are packed with flavor (thanks to a simple and fresh marinade), and then seared on the grill for maximum smokey char. It’s summer on a stick!"
        },
        {
            title: "Chicken Kababs",
            type: "lunch",
            image: "https://www.justonecookbook.com/wp-content/uploads/2014/04/Yakitori-II.jpg",
            price: 7.99,
            description: "Marinated chicken, grilled with white rice, & ginger asparagus."
        },
        {
            title: "Tuna Kababs",
            type: "lunch",
            image: "https://www.simplyrecipes.com/wp-content/uploads/2010/05/grilled-tuna-kebabs-vertical-b-1400-768x1152.jpg",
            price: 10.99,
            description: "Sushi grade tuna, seared and served with white rice, & ginger asparagus"
        },
        {
            title: "Spicy Lemon Shrimp",
            type: "lunch",
            image: "https://images.media-allrecipes.com/userphotos/720x405/1384969.jpg",
            price: 6.99,
            description: "Marinated shrimp served with fresh ginger asparagus, on top of steamed rice."
        },
        {
            title: "Chicken Kababs",
            type: "lunch",
            image: "https://www.justonecookbook.com/wp-content/uploads/2014/04/Yakitori-II.jpg",
            price: 7.99,
            description: "Marinated chicken, grilled with white rice, & ginger asparagus."
        },
        {
            title: "Korean beef Kabab",
            type: "lunch",
            image: "https://www.seriouseats.com/images/2016/04/20160423-skewer-recipes-roundup-02.jpg",
            price: 9.99,
            description: "These tender and juicy Korean Beef Kabobs are packed with flavor (thanks to a simple and fresh marinade), and then seared on the grill for maximum smokey char. It’s summer on a stick!"
        },
        {
            title: "Tuna Kababs",
            type: "lunch",
            image: "https://www.simplyrecipes.com/wp-content/uploads/2010/05/grilled-tuna-kebabs-vertical-b-1400-768x1152.jpg",
            price: 10.99,
            description: "Sushi grade tuna, seared and served with white rice, & ginger asparagus"
        }
    ],
    dinner:[
        {
            title: "Samurai's Plate",
            type: "dinner",
            image: "https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic_item/image/58516/retina_Japanese_breakfast.jpg",
            price: 5.99,
            description: "Bowl of rice, miso soup, any choice of the following: fish, grilled eggs, tofu natto or fermented soybeans), vegetables (one or a combination of fresh salad, pickles, or tsukudani or simmered vegetables)."
        },
        {
            title: "Korean beef Kabab",
            type: "dinner",
            image: "https://www.seriouseats.com/images/2016/04/20160423-skewer-recipes-roundup-02.jpg",
            price: 9.99,
            description: "These tender and juicy Korean Beef Kabobs are packed with flavor (thanks to a simple and fresh marinade), and then seared on the grill for maximum smokey char. It’s summer on a stick!"
        },
        {
            title: "Chicken Kababs",
            type: "dinner",
            image: "https://www.justonecookbook.com/wp-content/uploads/2014/04/Yakitori-II.jpg",
            price: 7.99,
            description: "Marinated chicken, grilled with white rice, & ginger asparagus."
        },
        {
            title: "Tuna Kababs",
            type: "dinner",
            image: "https://www.simplyrecipes.com/wp-content/uploads/2010/05/grilled-tuna-kebabs-vertical-b-1400-768x1152.jpg",
            price: 10.99,
            description: "Sushi grade tuna, seared and served with white rice, & ginger asparagus"
        },
        {
            title: "Spicy Lemon Shrimp",
            type: "dinner",
            image: "https://images.media-allrecipes.com/userphotos/720x405/1384969.jpg",
            price: 6.99,
            description: "Marinated shrimp served with fresh ginger asparagus, on top of steamed rice."
        },
        {
            title: "Chicken Kababs",
            type: "dinner",
            image: "https://www.justonecookbook.com/wp-content/uploads/2014/04/Yakitori-II.jpg",
            price: 7.99,
            description: "Marinated chicken, grilled with white rice, & ginger asparagus."
        },
        {
            title: "Korean beef Kabab",
            type: "dinner",
            image: "https://www.seriouseats.com/images/2016/04/20160423-skewer-recipes-roundup-02.jpg",
            price: 9.99,
            description: "These tender and juicy Korean Beef Kabobs are packed with flavor (thanks to a simple and fresh marinade), and then seared on the grill for maximum smokey char. It’s summer on a stick!"
        },
        {
            title: "Tuna Kababs",
            type: "dinner",
            image: "https://www.simplyrecipes.com/wp-content/uploads/2010/05/grilled-tuna-kebabs-vertical-b-1400-768x1152.jpg",
            price: 10.99,
            description: "Sushi grade tuna, seared and served with white rice, & ginger asparagus"
        }
    ]
};
   


var bDone = 0;

menu.breakfast.forEach(function(pro){
    Food.create(pro, function(err, result){
        if(err){
            console.log(err);
        }else{
            result.save();
        }
    });
    if (bDone >= menu.breakfast.length){
        mongoose.disconnect();
    }
    else{
        bDone++;
    }
    console.log(pro);
});
var lDone = 0;
menu.lunch.forEach(function(pro){
    Food.create(pro, function(err, result){
        if(err){
            console.log(err);
        }else{
            result.save();
        }
    });
    if (lDone >= menu.lunch.length){
        mongoose.disconnect();
    }
    else{
        lDone++;
    }
    console.log(pro);
});