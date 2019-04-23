$(document).ready(function(){
    // var $grid = $('.menu').isotope({
    //   // options
    //   itemSelector: '.food-box',
    //   layoutMode: 'fitRows',
    // });
    // // filter items on button click
    
    // $(".menu-filter-list li").on("click", function(){
    //     $(this).siblings().children().removeClass("picked");
    //     $(this).children().addClass("picked");
    //     var selector = $(this).attr("data-filter");
    //     $grid.isotope({ filter: selector });
    // });
    
    
    $(".food-box").on("click", function(){
        var popup = $("#item-info");
        popup.css("display", "block");
        popup.removeClass("fadeOut").addClass("fadeIn");
        
        popup.children().children("#p-i-image").css("background-image", "url(" + $(this).children(".food-img-cont").children("img").attr("src") + ")");
        popup.children().children(".p-i-h-c").children("#p-i-h").text($(this).children(".food-name-and-price").children(".food-name").text());
        popup.children().children(".p-i-h-c").children(".p-i-price").text($(this).children(".food-name-and-price").children(".food-price").text());
        popup.children().children("#popup-d").text($(this).children(".food-hidden-info").children(".food-descrition").text());
        popup.children().children(".add-to-cart").attr("href", $(this).children(".food-hidden-info").children(".add-to-cart").attr("href"));
        popup.children().children(".hidden-review-form").children("form").attr("action", $(this).children(".food-hidden-info").children(".leave-review").attr("href"));
        popup.children().children(".comment-cont").html($(this).children(".food-hidden-info").children(".reviews-container").html());
        
    });
    
    $(".leave-review").on("click", function(){
        $(".hidden-review-form").fadeIn();
    });
    
    
    $("#p-i-close-btn").on("click", function(){
        $("#item-info").removeClass("fadeIn").addClass("fadeOut");
        setTimeout(function(){
            $("#item-info").css("display", "none");
            $(".hidden-review-form").fadeOut(100);
        }, 800)
        
    })
    
    
    
    
    
    
    $(window).on("load", function(){
        if( $("input[name='star']").is(':checked') ){
            var child = parseInt($("input[name='star']:checked").val() * 2) -1;
            for ( child ; child > 0; child = child - 2){
                $(".star:nth-child(" + child + ")").addClass("label-high");
            }
        }
    });
    $(".star").on("click", function(){
        $(".star").removeClass("label-high");
        $(this).addClass("label-high");
        var value = $("#"+$(this).attr("for")).val();
        $(this).siblings(".star").each(function(label){
            if( $("#"+$(this).attr("for")).val() < value ){
                $(this).addClass("label-high");
            }
        });
    });
    
    $("#submit-btn").on("click", function(e){
        if (!$("input[name='star']:checked").val()) {
           $(".r-c-v").fadeIn(100).css("display", "inline-block").delay(3000).fadeOut(300);
           e.preventDefault();
        }
    });
});