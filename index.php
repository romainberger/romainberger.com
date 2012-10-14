<?php
    require('config.inc.php');
?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Romain Berger</title>
    <meta name="description" content="Romain Berger - Web and music">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="<?php echo _BASE_URL_; ?>css/main.css">
</head>
<body>

    <div id="wrapper">
        <div id="header"><a href="<?php echo _BASE_URL_; ?>">
            <p class="h1like">Hi,</p>
            <h1>I'm Romain Berger</h1></a>
        </div>

        <div class="block leftBlock">
            <h2>I am a 24 years old web developper at <a href="http://bbsconcept.com" title="BBS Concept">BBS Concept</a> / <a href="http://stickaz.com" title="Stickaz">Stickaz</a>.</h2>
            <p>I also <a href="<?php echo _BASE_URL_; ?>music">play guitar</a> in some bands.</p>
            <p>I am not looking for a new position, but you can find <a href="<?php echo _BASE_URL_; ?>about">my resume here</a>.</p>
        </div>

        <div class="block rightBlock">
            <h2>For the web related stuff:</h2>
            <div>
                <ul>
                    <li><a href="http://twitter.com/romain__berger" title="twitter" class="bgLink sprites-twitter" id="twitter" target="_blank"></a></li>
                    <li><a href="https://github.com/romainberger" title="github" class="bgLink sprites-github" id="github" target="_blank"></a></li>
                    <li><a href="<?php echo _BASE_URL_; ?>lab" title="lab" class="bgLink" id="lab">Lab</a></li>
                </ul>
            </div>
            <div class="cb"></div>
            <h2>For the music related stuff:</h2>
            <div>
                <ul>
                    <li><a href="http://www.facebook.com/pages/Romain-Berger/139235519514584?ref=hl" title="facebook" class="bgLink sprites-facebook" id="facebook" target="_blank"></a></li>
                    <li><a href="http://www.youtube.com/user/romainmetal" title="youtube" class="bgLink sprites-youtube" id="youtube" target="_blank"></a></li>
                </ul>
            </div>
        </div>
        <div class="cb"></div>
        <p class="contactText">You can also contact me here: <a href="mailto:romain@romainberger.com">romain@romainberger.com</a></p>
    </div><!-- end wrapper -->

    <script>
        var _gaq=[['_setAccount','UA-25925169-1'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>