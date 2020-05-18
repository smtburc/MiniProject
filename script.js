var image;
var filteredImage;

var canvas;

function uploadFile() {
    var fileinput = document.getElementById('finput');
    image = new SimpleImage(fileinput);
    canvas = document.getElementById('canvas');
    image.drawTo(canvas);
}

function doGray() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterGray();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function imageIsLoaded() {
    return image != null;
}

function filterGray() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        filteredPixel.setRed(avarage);
        filteredPixel.setGreen(avarage);
        filteredPixel.setBlue(avarage);
    }
}

function resetImage() {
    image.drawTo(canvas);

}

function doRed() {

    if (imageIsLoaded()) {     // check if image is loaded
        filterRed();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }

}

function filterRed() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avarage < 128) {
            filteredPixel.setRed(avarage * 2);
            filteredPixel.setGreen(0);
            filteredPixel.setBlue(0);
        } else {
            filteredPixel.setRed(255);
            filteredPixel.setGreen(avarage * 2 - 255);
            filteredPixel.setBlue(avarage * 2 - 255);
        }
    }
}


function doGrayCenteredRed() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterGrayCenteredRed();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function filterGrayCenteredRed() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    var centerX = image.getWidth() / 2;
    var centerY = image.getHeight() / 2;
    var r = (centerX + centerY) / 2;

    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

        var line = Math.random() * r;
        if (Math.sqrt(Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2)) > line) {
            if (avarage < 128) {
                filteredPixel.setRed(avarage * 2);
                filteredPixel.setGreen(0);
                filteredPixel.setBlue(0);
            } else {
                filteredPixel.setRed(255);
                filteredPixel.setGreen(avarage * 2 - 255);
                filteredPixel.setBlue(avarage * 2 - 255);
            }
        } else {
            filteredPixel.setRed(avarage);
            filteredPixel.setGreen(avarage);
            filteredPixel.setBlue(avarage);
        }
    }

}