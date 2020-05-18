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

