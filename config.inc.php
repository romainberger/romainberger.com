<?php

$env = 'dev';

if ($env == 'dev') {
	define('_BASE_URL_', 'http://dev.romainberger.com/');
}
elseif ($env == 'prod') {
	define('_BASE_URL_', 'http://romainberger.com/');
}