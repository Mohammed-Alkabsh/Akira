
$(document).ready(function(){
    $("#nav-toggler").on("click", function(){
        if( $(".nav_list_cont").hasClass("fadeInRight") ){
            $(".nav_list_cont").removeClass("fadeInRight").addClass("fadeOutRight");
            $("#bar-line-1").css({
                "transform": "rotate(0deg) scaleX(1)",
                "top": "15%"
            });
            $("#bar-line-2").css("opacity", "1");
            $("#bar-line-3").css({
                "transform": "rotate(0deg) scaleX(1)",
                "top": "75%"
            });
        }
        else if( $(".nav_list_cont").hasClass("fadeOutRight") ){
            $(".nav_list_cont").removeClass("fadeOutRight").addClass("fadeInRight");
            $("#bar-line-1").css({
                "transform": "rotate(-45deg) scaleX(1.3)",
                "top": "45%"
            });
            $("#bar-line-2").css("opacity", "0");
            $("#bar-line-3").css({
                "transform": "rotate(45deg) scaleX(1.3)",
                "top": "45%"
            });
        }
        else{
            $(".nav_list_cont").addClass("fadeInRight");
            $(".nav_list_cont").css("display", "block");
            $("#bar-line-1").css({
                "transform": "rotate(-45deg) scaleX(1.3)",
                "top": "45%"
            });
            $("#bar-line-2").css("opacity", "0");
            $("#bar-line-3").css({
                "transform": "rotate(45deg) scaleX(1.3)",
                "top": "45%"
            });
        }
    });
    $(document).on("scroll", function(){
        if( $(".nav_list_cont").hasClass("fadeOutRight") && $(".nav_list_cont").css("opacity") === "0" ){
            $(".nav_list_cont").css("display", "none").removeClass("fadeOutRight");
        }else{
            return;
        }
    });
    $(window).on("load resize", function(){
        if($(window).width() >= 666){
            $(".nav_list_cont").css("display", "block");
            if($(".nav_list_cont").hasClass("fadeInRight")){
                $(".nav_list_cont").removeClass("fadeInRight");
            }else if($(".nav_list_cont").hasClass("fadeOutRight")){
                $(".nav_list_cont").removeClass("fadeOutRight");
            }else{
                return;
            }
        }
        if($(window).width() <= 666 ){
            if($(".nav_list_cont").hasClass("fadeInRight")){
                $(".nav_list_cont").css("display", "block");;
            }else if($(".nav_list_cont").hasClass("fadeOutRight")){
                $(".nav_list_cont").css("display", "block");
            }else{
                $(".nav_list_cont").css("display", "none");
                $("#bar-line-1").css({
                    "transform": "rotate(0deg) scaleX(1)",
                    "top": "15%"
                });
                $("#bar-line-2").css("opacity", "1");
                $("#bar-line-3").css({
                    "transform": "rotate(0deg) scaleX(1)",
                    "top": "75%"
                });
            }
        }
    });
    
    //Navigation menu highlight change on click
    $(".nav-item a").on("click", function(e){
        var picked = $(this);
        picked.addClass("active");
        picked.parent().siblings().children().removeClass("active");
    });
});