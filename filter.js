var image;
var filteredImage;

var canvas;

function uploadFile() {
    var fileinput = document.getElementById('finput');
    image = new SimpleImage(fileinput);
    canvas = document.getElementById('canvas');
    image.drawTo(canvas);
}

function imageIsLoaded() {
    return image != null;
}

function resetImage() {
    image.drawTo(canvas);
}

function clearIcon() {
    var icon = document.getElementById('canvas-icon');
    icon.style = "visibility:hidden;";
    canvas.style.height = "";
}

//doMethots

function doGray() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterGray();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function doRed() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterRed();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function doGrayCenteredRed() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterGrayCenteredRed();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function doRainbow() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterRainbow();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

function doBlur() {
    if (imageIsLoaded()) {     // check if image is loaded
        filterBlur();	                      // function performs the grayscale work
        filteredImage.drawTo(canvas);	          // display image
    }
}

//filter methots

function filterGray() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        toGray(filteredPixel, avarage);
    }
}

function filterRed() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        toRed(filteredPixel, avarage);
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
            toRed(filteredPixel, avarage);
        } else {
            toGray(filteredPixel, avarage);
        }
    }

}

function filterRainbow() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var filteredPixel = filteredImage.getPixel(x, y);
        var avarage = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (y < image.getHeight() / 7) {
            toRed(filteredPixel, avarage);

        } else if (y < image.getHeight() / 7 * 2) {
            toOrange(filteredPixel, avarage);

        } else if (y < image.getHeight() / 7 * 3) {
            toYellow(filteredPixel, avarage);

        } else if (y < image.getHeight() / 7 * 4) {
            toGreen(filteredPixel, avarage);

        } else if (y < image.getHeight() / 7 * 5) {
            toBlue(filteredPixel, avarage);

        } else if (y < image.getHeight() / 7 * 6) {
            toIndigo(filteredPixel, avarage);

        } else {
            toViolet(filteredPixel, avarage);

        }
    }
}

function filterBlur() {
    filteredImage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var filteredPixel of filteredImage.values()) {
        var x = filteredPixel.getX();
        var y = filteredPixel.getY();

        var randomX = (Math.random() * 10) - 5;
        var randomY = (Math.random() * 10) - 5;
        if (x + randomX < 0) {
            randomX = 0 - x;
        } else if (x + randomX >= image.getWidth()) {
            randomX = image.getWidth() - x - 1;
        }
        if (y + randomY < 0) {
            randomY = 0 - y;
        } else if (y + randomY >= image.getHeight()) {
            randomY = image.getHeight() - y - 1;
        }
        var pixel = image.getPixel(x + randomX, y + randomY);
        filteredPixel.setRed(pixel.getRed());
        filteredPixel.setGreen(pixel.getGreen());
        filteredPixel.setBlue(pixel.getBlue());
    }

}

//color methots

function toRed(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(avarage * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen(avarage * 2 - 255);
        pixel.setBlue(avarage * 2 - 255);
    }
}

function toGray(pixel, avarage) {
    pixel.setRed(avarage);
    pixel.setGreen(avarage);
    pixel.setBlue(avarage);
}

function toOrange(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(avarage * 2);
        pixel.setGreen(avarage * 0.8);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen(avarage * 1.2 - 51);
        pixel.setBlue(avarage * 2 - 255);
    }
}

function toYellow(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(avarage * 2);
        pixel.setGreen(avarage * 2);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(avarage * 2 - 255);
    }
}

function toGreen(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(0);
        pixel.setGreen(avarage * 2);
        pixel.setBlue(0);
    } else {
        pixel.setRed(avarage * 2 - 255);
        pixel.setGreen(255);
        pixel.setBlue(avarage * 2 - 255);
    }
}

function toBlue(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(avarage * 2);
    } else {
        pixel.setRed(avarage * 2 - 255);
        pixel.setGreen(avarage * 2 - 255);
        pixel.setBlue(255);
    }
}


function toIndigo(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(avarage * 0.8);
        pixel.setGreen(0);
        pixel.setBlue(avarage * 2);
    } else {
        pixel.setRed(avarage * 1.2 - 51);
        pixel.setGreen(avarage * 2 - 255);
        pixel.setBlue(255);
    }
}


function toViolet(pixel, avarage) {
    if (avarage < 128) {
        pixel.setRed(avarage * 1.6);
        pixel.setGreen(0);
        pixel.setBlue(avarage * 1.6);
    } else {
        pixel.setRed(avarage * 0.4 + 153);
        pixel.setGreen(avarage * 2 - 255);
        pixel.setBlue(avarage * 0.4 + 153);
    }
}