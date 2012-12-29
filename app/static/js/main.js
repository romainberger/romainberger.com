$(document).ready(function() {
	var headerHeight = $('.header').height();
	var headerBg = $('.header .bg');
	console.log(headerHeight);
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll <= 250) {
			var opacity = 1 - (parseInt(scroll * 100 / headerHeight) / 100);
			headerBg.css('opacity', opacity);
		}
	});
});