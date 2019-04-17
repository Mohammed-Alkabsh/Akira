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
    
});