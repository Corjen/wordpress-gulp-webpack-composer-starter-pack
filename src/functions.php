<?php
/**
 * Functions - Include composer autoload, templates & widgets
 *
 * @package WordPress
 * @subpackage Example
 * @version 1.0.0
 */

namespace Example\Lib;

/* Load composer autoloader */
require 'vendor/autoload.php';

/**
 * Load classes
 */
new Cleanup();
new Settings();
new Test();
new Test2();

if ( is_admin() ) {
  new AdminSettings();
}


?>
