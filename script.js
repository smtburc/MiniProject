var image;

function uploadFile() {
    var fileinput = document.getElementById('finput');
    image = new SimpleImage(fileinput);
    var c = document.getElementById('canvas');
    image.drawTo(c);
}