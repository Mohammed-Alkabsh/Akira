$(document).ready(function(){
    
    $(".item").on("click", function(){
        $(window).on("scroll", function(){
            $("#item-info").css("top", $(window).scrollTop() + "px");
        })
        $("#item-info").css("top", $(window).scrollTop() + "px");
        
        var info = $(this).children(".hidden-info");
        $("#p-i-image").css("background-image", "url(" + $(this).children(".item-img").attr("src") + ")")
        $("#p-i-h").text(info.children("#title").text());
        $("#popup-d").text(info.children("#description").text());
        $("#p-i-p").text(info.children("#price").text());
        $("#p-i-q").html("<span>x</span>" + info.children("#quantity").text());
        $("#p-i-t").text(info.children("#total").text());
        
        $("#item-info").css("display", "block");
        $("#item-info").addClass("zoomIn")
    });
    $("#p-i-close-btn").on("click", function(){
        $("#item-info").removeClass("zoomIn").addClass("zoomOut");
        setTimeout(function(){
            $("#item-info").css("display", "none"); 
            $("#item-info").removeClass("zoomOut");
        }, 300);
    });
    
    $("#orders-btn").addClass("active-menu-btn");
    $("#orders-btn").parent().siblings().children().removeClass("active-menu-btn");
    $(".orders-cont").siblings().css("display", "none");
    $(".orders-cont").css("display", "block").fadeIn(400);
    
    $("#orders-btn").on("click", function(e){
        e.preventDefault();
        $(this).addClass("active-menu-btn");
        $(this).parent().siblings().children().removeClass("active-menu-btn");
        $(".orders-cont").siblings().css("display", "none");
        $(".orders-cont").css("display", "block").fadeIn(400);
    });
    
    $("#reviews-btn").on("click", function(e){
        e.preventDefault();
        $(this).addClass("active-menu-btn");
        $(this).parent().siblings().children().removeClass("active-menu-btn");
        $(".reviews-cont").siblings().css("display", "none");
        $(".reviews-cont").css("display", "block").fadeIn(400);
    });
    
    $("#account-btn").on("click", function(e){
        e.preventDefault();
        $(this).addClass("active-menu-btn");
        $(this).parent().siblings().children().removeClass("active-menu-btn");
        $(".edit-account-cont").siblings().css("display", "none");
        $(".edit-account-cont").css("display", "block").fadeIn(400);
    });
    
    $(".edit-review").on("click", function(){
        $(this).parent().parent().parent().parent().siblings().children(".stars-comments").children(".edit-delete-review").children(".hidden-edit-form").fadeOut(300);
        $(this).parent().siblings($(".hidden-edit-form")).fadeIn(300);
    });
    
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
    
    $(".submit-btn").on("click", function(e){
        console.log($(this).siblings((".stars-cont")));
        if (!$(this).siblings(".stars-cont").children("input[name='star']:checked").val()) {
          $(this).siblings($(".r-c-v")).fadeIn(100).css("display", "inline-block");
          $(".r-c-v").delay(1000).fadeOut(300);
          e.preventDefault();
        }
    });
    
});