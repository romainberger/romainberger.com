<?php require 'config.inc.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Romain Berger</title>
    <meta name="description" content="Romain Berger - Web and music">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="<?php echo _BASE_URL_; ?>css/main.css">
</head>
<body>

	<header>
		<div class="wrapper">
			<a href="<?php echo _BASE_URL_; ?>"><h1>ROMAIN BERGER</h1></a>

			<div id="header_right">
				<a href="#" class="text_link <?php if(isset($currentIndex) && $currentIndex == 'web') echo 'selected'; ?>">WEB</a>
				<a href="<?php echo _BASE_URL_; ?>music" class="text_link <?php if(isset($currentIndex) && $currentIndex == 'music') echo 'selected'; ?>">MUSIC</a>
				<a href="<?php echo _BASE_URL_; ?>about" class="text_link <?php if(isset($currentIndex) && $currentIndex == 'about') echo 'selected'; ?>">ABOUT</a>
				<div class="sep"></div>
				<a href="http://twitter.com/romain__berger" class="icons sprites-twitter" target="_blank"></a>
				<a href="http://github.com/romainberger" class="icons sprites-github" target="_blank"></a>
			</div>
		</div>
    </header>
    <div class="cb"></div>

    <div class="wrapper">