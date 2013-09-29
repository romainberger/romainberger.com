var video = document.querySelector('video');
var canvasP = document.getElementById('primaryCanvas');
var canvasS = document.getElementById('secondaryCanvas');
var ctxP = canvasP.getContext('2d');
var ctxS = canvasS.getContext('2d');
var shootStream = null;
var button = document.querySelector('button');

function fail(){
	alert('You need a modern browser to enjoy this awesome machinery. Get Google Chrome 21 for example and you\'re good to go');
};

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

if(navigator.getUserMedia){
  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    shootStream = stream;
  }, fail);
}
else
	fail();

setInterval(function(){
	if(shootStream){
		ctxP.drawImage(video, 0, 0);
		pixelize();
	}
}, 20);

function pixelize(){
	pixelSize = 50;
	ctxS.clearRect(0, 0, canvasS.width, canvasS.height);
	for(i = 0; i < (canvasP.height / pixelSize); i++){
		for(j = 0; j < (canvasS.width / pixelSize); j++){
			var y = i * pixelSize;
			var x = j * pixelSize;
			var imageData = ctxP.getImageData(x, y, pixelSize, pixelSize);
			var data = imageData.data;
			var color = 'rgb('+data[0]+','+data[1]+','+data[2]+')';
			ctxS.fillStyle = color;
			ctxS.fillRect(x, y, pixelSize, pixelSize);
		}
	}
}