/**
 *	Manage the text in the info bar
 *
 */

 $(document).ready(function(){
 	var texts = {
 		pen : ' ',
 		brush : ' ',
 		erase : ' ',
 		fill : ' ',
 		spray : ' ',
 		eyedropper : ' ',
 		zoom : ' ',
 		line : ' ',
 		rect : ' ',
 		circle : ' '
 	}

 	$('#tool_bar button').hover(function(){
 		var text = ( texts[$(this).attr('id')] ) ? texts[$(this).attr('id')] : 'Tool not available yet';

 		$('#infos p').text(text);
 	}, function(){
 		$('#infos p').text('');
 	});
 });