var video = document.querySelector('video');
var canvasP = document.getElementById('primaryCanvas');
var canvasS = document.getElementById('secondaryCanvas');
var ctxP = canvasP.getContext('2d');
var ctxS = canvasS.getContext('2d');
var shootStream = null;
var button = document.querySelector('button');
var image = document.querySelector('img');
var backButton = document.getElementById('back');

function fail(){
	alert('You need a modern browser to enjoy this awesome machinery. Get Google Chrome 21 for example and you\'re good to go');
};

function shoot(){
	if(shootStream){
		ctxP.drawImage(video, 0, 0);
		pixelise();
		var photo = canvasS.toDataURL('image/png');
		image.src = photo;
	}
}

function pixelise(){
	var pixelSize = document.getElementById('pixelSize');
	var pixelSize = pixelSize.value;
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
	video.style.display = 'none';
	image.style.display = 'block';
	backButton.style.display = 'block';
}

button.addEventListener('click', shoot);


window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

if(navigator.getUserMedia){
  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    shootStream = stream
  }, fail);
}
else
	fail();

backButton.addEventListener('click', function(){
	image.style.display = 'none';
	video.style.display = 'block';
});