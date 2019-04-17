$(document).ready(function(){
    var $grid = $('.menu').isotope({
      // options
      itemSelector: '.food-box',
      layoutMode: 'fitRows',
    });
    // filter items on button click
    
    $(".menu-filter-list li").on("click", function(){
        $(this).siblings().children().removeClass("picked");
        $(this).children().addClass("picked");
        var selector = $(this).attr("data-filter");
        $grid.isotope({ filter: selector });
    });
    
    
    $(".food-box").on("click", function(){
        $(this).siblings().removeClass("food-box-hovered");
        $(this).siblings().children(".food-hidden-info").removeClass("info-box-hovered").children("p").removeClass("p-hovered");
        $(this).addClass("food-box-hovered touched");
        $(this).children(".food-hidden-info").addClass("info-box-hovered").children("p").addClass("p-hovered");
        if( $(this).siblings().hasClass("touched") ){
            if( $(window).width() <= 930 ){
                var tBrother = $(this).siblings(".touched");
                if( $(this).offset().top < tBrother.offset().top ){
                    $("body, html").animate({
                        scrollTop: $(this).offset().top -200
                    }, 400);
                }else if( $(this).offset().top === tBrother.offset().top ){
                    $("body, html").animate({
                        scrollTop: $(this).offset().top - 100
                    }, 400);
                
                }else{
                    $("body, html").animate({
                        scrollTop: $(this).offset().top - 400
                    }, 400);
                }
            }else{
                $("body, html").animate({
                    scrollTop: $(this).offset().top -100
                }, 400);
            }
            $(this).siblings(".touched").removeClass("touched");
                
        }else{
            $("body, html").animate({
                scrollTop: $(this).offset().top -100
            }, 400);
        }
    });
    $(".food-box").on("mouseleave", function(){
        $(this).removeClass("food-box-hovered");
        $(this).children(".food-hidden-info").removeClass("info-box-hovered").children("p").removeClass("p-hovered");
    });
    
});