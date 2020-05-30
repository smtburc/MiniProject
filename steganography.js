var image1;
var image2;
var image3;

var image4;
var image5;
var image6;

var canvas1;
var canvas2;
var canvas3;
var canvas4;
var canvas5;
var canvas6;

function preInit() {
    canvas1 = document.getElementById('canvas1');
    canvas2 = document.getElementById('canvas2');
    canvas3 = document.getElementById('canvas3');
    canvas4 = document.getElementById('canvas4');
    canvas5 = document.getElementById('canvas5');
    canvas6 = document.getElementById('canvas6');
}

preInit();

//upload methods

function uploadFile1() {
    var fileinput = document.getElementById('finput1');
    image1 = new SimpleImage(fileinput);
    image1.drawTo(canvas1);
}

function uploadFile2() {
    var fileinput = document.getElementById('finput2');
    image2 = new SimpleImage(fileinput);
    image2.drawTo(canvas2);
}

function uploadFile4() {
    var fileinput = document.getElementById('finput4');
    image4 = new SimpleImage(fileinput);
    image4.drawTo(canvas4);
}

//control methods

function imageIsLoaded1() {
    return image1 != null;
}

function imageIsLoaded2() {
    return image2 != null;
}

function imageIsLoaded4() {
    return image4 != null;
}

//clear methods

function clearImage1() {
    var icon = document.getElementById('canvas-icon1');
    icon.style = "visibility:visible;";
    canvas1.style.height = "200px";
    canvas1.style.opacity = 0;
    image1 = null;
}

function clearImage2() {
    var icon = document.getElementById('canvas-icon2');
    icon.style = "visibility:visible;";
    canvas2.style.height = "200px";
    canvas2.style.opacity = 0;
    image2 = null;
}

function clearImage3() {
    var icon = document.getElementById('canvas-icon3');
    icon.style = "visibility:visible;";
    canvas3.style.height = "200px";
    canvas3.style.opacity = 0;
    image3 = null;
}

function clearImage4() {
    var icon = document.getElementById('canvas-icon4');
    icon.style = "visibility:visible;";
    canvas4.style.height = "200px";
    canvas4.style.opacity = 0;
    image4 = null;
}

function clearImage5() {
    var icon = document.getElementById('canvas-icon5');
    icon.style = "visibility:visible;";
    canvas5.style.height = "200px";
    canvas5.style.opacity = 0;
    image5 = null;
}

function clearImage6() {
    var icon = document.getElementById('canvas-icon6');
    icon.style = "visibility:visible;";
    canvas6.style.height = "200px";
    canvas6.style.opacity = 0;
    image6 = null;
}

function clearIcon1() {
    var icon = document.getElementById('canvas-icon1');
    icon.style = "visibility:hidden;";
    canvas1.style.height = "";
    canvas1.style.opacity = 1;
}

function clearIcon2() {
    var icon = document.getElementById('canvas-icon2');
    icon.style = "visibility:hidden;";
    canvas2.style.height = "";
    canvas2.style.opacity = 1;
}

function clearIcon3() {
    var icon = document.getElementById('canvas-icon3');
    icon.style = "visibility:hidden;";
    canvas3.style.height = "";
    canvas3.style.opacity = 1;
}

function clearIcon4() {
    var icon = document.getElementById('canvas-icon4');
    icon.style = "visibility:hidden;";
    canvas4.style.height = "";
    canvas4.style.opacity = 1;
}

function clearIcon5() {
    var icon = document.getElementById('canvas-icon5');
    icon.style = "visibility:hidden;";
    canvas5.style.height = "";
    canvas5.style.opacity = 1;
}

function clearIcon6() {
    var icon = document.getElementById('canvas-icon6');
    icon.style = "visibility:hidden;";
    canvas6.style.height = "";
    canvas6.style.opacity = 1;
}

//doMethots

function doHide() {
    if (imageIsLoaded1() && imageIsLoaded2()) {
        hideImage();
        image3.drawTo(canvas3);	          // display image
        clearIcon3();
    }
}

function doShow() {
    if (imageIsLoaded4()) {     // check if image is loaded
        showImage();	                      // function performs the grayscale work
        image5.drawTo(canvas5);
        image6.drawTo(canvas6);                 // display image
        clearIcon5();
        clearIcon6();
    }
}


//process methots

function hideImage() {
    var minWidth = image1.getWidth();
    var minHeight = image1.getHeight();
    if (image2.getWidth() < minWidth) {
        minWidth = image2.getWidth();
    }
    if (image2.getHeight() < minHeight) {
        minHeight = image2.getHeight();
    }
    var im1 = cropImage(image1, minWidth, minHeight);
    var im2 = cropImage(image2, minWidth, minHeight);
    im1 = chop2hide(im1);
    im2 = shift(im2);
    image3 = combine(im1, im2);
}


function cropImage(image, width, height) {
    var cropImage = new SimpleImage(width, height);
    for (var cropPixel of cropImage.values()) {
        var x = cropPixel.getX();
        var y = cropPixel.getY();
        var pixel = image.getPixel(x, y);
        cropPixel.setRed(pixel.getRed());
        cropPixel.setGreen(pixel.getGreen());
        cropPixel.setBlue(pixel.getBlue());
    }
    return cropImage;
}


function chop2hide(image) {
    var resultImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var pixel2 = resultImage.getPixel(x, y);
        pixel2.setRed(clearBits(pixel.getRed()));
        pixel2.setGreen(clearBits(pixel.getGreen()));
        pixel2.setBlue(clearBits(pixel.getBlue()));
    }
    return resultImage;
}

function shift(image) {
    for (var pixel of image.values()) {
        pixel.setRed(pixel.getRed() / 16);
        pixel.setGreen(pixel.getGreen() / 16);
        pixel.setBlue(pixel.getBlue() / 16);
    }
    return image;

}

function combine(im1, im2) {
    var resultImage = new SimpleImage(im1.getWidth(), im1.getHeight());
    for (var pixel1 of im1.values()) {
        var x = pixel1.getX();
        var y = pixel1.getY();
        var pixel2 = im2.getPixel(x, y);
        var resultPixel = resultImage.getPixel(x, y);
        resultPixel.setRed(pixel1.getRed() + pixel2.getRed());
        resultPixel.setGreen(pixel1.getGreen() + pixel2.getGreen());
        resultPixel.setBlue(pixel1.getBlue() + pixel2.getBlue());
    }
    return resultImage;
}

function clearBits(colorval) {
    return Math.floor(colorval / 16) * 16;
}


function showImage() {
    var width = image4.getWidth();
    var height = image4.getHeight();
    image5 = new SimpleImage(width, height);
    image6 = new SimpleImage(width, height);
    image5 = chop2hide(image4);
    image6 = leftShift(image4);
}

function leftShift(image) {
    for (var pixel of image.values()) {
        pixel.setRed((pixel.getRed() - clearBits(pixel.getRed())) * 16);
        pixel.setGreen((pixel.getGreen() - clearBits(pixel.getGreen())) * 16);
        pixel.setBlue((pixel.getBlue() - clearBits(pixel.getBlue())) * 16);
    }
    return image;
}