$(document).ready(function(){

    // NAVBAR
    $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
    // typing
    autoType(".typewritter",200);
})

function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".home-text");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
            (function(i,char){
                setTimeout(function() {
                    newString += char;
                    thhis.text(newString);
                },i*typingSpeed);
            })(i+1,text[i]);
        }
        setTimeout(function() {
            $(elementClass).append('<span class="blinker">|</span>');
        }, amntOfChars * typingSpeed);

    },500);
}


