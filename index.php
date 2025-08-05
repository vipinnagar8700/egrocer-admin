<?php
/*session_start();
$myfile = fopen("log_".date('YmdH').".txt", "a") or die("Unable to open file!");
fwrite(date('Y-m-d H:i:s')." ==> ".json_encode($_REQUEST)." ==> ".json_encode($_SERVER)." ==> ".json_encode($_SESSION), $txt);
fclose($myfile);*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, x-access-key');
/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */
// define('STDIN',fopen("php://stdin","r"));
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

require_once __DIR__.'/public/index.php';
