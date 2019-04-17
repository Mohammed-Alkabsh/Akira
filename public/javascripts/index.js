$(document).ready(function(){
    //===================MAKING FADE-SHOW===========================================
    var slides = [$("#slide-1"), $("#slide-2"), $("#slide-3"), $("#slide-4")];
    var currentSlide = 0;
    var okToSlide = true;
    slides.forEach(function(slide){
        slide.children().hide();
        slide.hide();
    });
    slides[currentSlide].fadeIn(500, function(){
        $(this).children().fadeIn(500, function(){
            setTimeout(function(){ changeSlide(currentSlide) }, 5000);
        });
    });
    
    function changeSlide(slide){
        if( okToSlide === true){
            
        
            slides[slide].children().fadeOut(500, function(){
                $(this).parent().fadeOut(500);
                if(slide < slides.length - 1){
                    slide++;
                }else{
                    slide = 0;
                }
                slides[slide].fadeIn(500, function(){
                    slides[slide].children().fadeIn(500, function(){
                        currentSlide = slide;
                        setTimeout(function(){ changeSlide(slide) }, 5000);
                        return currentSlide;
                    });
                });
            });
        }else{
            return;
        }
    }
    
    $("#btn-one").on("click", function(){
        okToSlide = false;
        slides[currentSlide].children().fadeOut(500, function(){
            $(this).parent().fadeOut(500);
            if(currentSlide < slides.length - 1){
                currentSlide++;
            }else{
                currentSlide = 0;
            }
            slides[currentSlide].fadeIn(500, function(){
                slides[currentSlide].children().fadeIn(500, function(){
                    currentSlide = currentSlide;
                    return currentSlide;
                });
            });
        });
        
    });
    $("#btn-two").on("click", function(){
        okToSlide = false;
        slides[currentSlide].children().fadeOut(500, function(){
            $(this).parent().fadeOut(500);
            if(currentSlide >= 1){
                currentSlide--;
            }else{
                currentSlide = slides.length -1;
            }
            slides[currentSlide].fadeIn(500, function(){
                slides[currentSlide].children().fadeIn(500, function(){
                    currentSlide = currentSlide;
                    return currentSlide;
                });
            });
        });
        
    });
    $("#daily-right").on("click", function(){
        $("#daily-right, #daily-left").prop("disabled", "true");
        var slideWidth = $(".daily-slides-cont").css("width");
        slideWidth = slideWidth.substring(0, slideWidth.length - 2);
        var boxWidth = slideWidth / $(".quad-box-cont").length;
        var Dslide = $(".daily-slides-cont");
        var DSLoc = $(".daily-slides-cont").css("left");
        DSLoc = DSLoc.substring(0, DSLoc.length - 2);
        var nextLoc;
        if( DSLoc <= -slideWidth + boxWidth){
            nextLoc = 0;
        }else{
            nextLoc = DSLoc - boxWidth;
        }
        console.log(nextLoc);
        
        Dslide.animate({"left": nextLoc + "px"}, 300, function(){
            $("#daily-right, #daily-left").prop("disabled", false);
        });
    });
    $("#daily-left").on("click", function(){
        $("#daily-right, #daily-left").prop("disabled", "true");
        var slideWidth = $(".daily-slides-cont").css("width");
        slideWidth = slideWidth.substring(0, slideWidth.length - 2);
        var boxWidth = slideWidth / $(".quad-box-cont").length;
        var Dslide = $(".daily-slides-cont");
        var DSLoc = $(".daily-slides-cont").css("left");
        DSLoc = DSLoc.substring(0, DSLoc.length - 2);
        var nextLoc;
        if( DSLoc > -boxWidth){
            nextLoc = -parseFloat(slideWidth) + parseFloat(boxWidth);
        }else if( DSLoc <= -boxWidth ){
            nextLoc = parseFloat(DSLoc) + parseFloat(boxWidth);
        }
        console.log(nextLoc);
        Dslide.animate({"left": nextLoc + "px"}, 300, function(){
            $("#daily-right, #daily-left").prop("disabled", false);
        });
    });
    
});

