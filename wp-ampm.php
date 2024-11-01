<?php if (!defined('WPINC')) die();
/*
	Plugin Name: Wordpress AM/PM Plugin
	Plugin URI: http://eduard.kozachek.net/projects/wp-ampm/
	Description: Plugin replaces the standard time controls (24h) with am/pm time controls
	Version: 1.0.1
	Author: antongorodezkiy
	Author URI: http://eduard.kozachek.net/
	License: GPLv2
	Text Domain: wp-ampm
*/

define('WP_AMPM_PLUGIN','wp-ampm');
define('WP_AMPM_APPPATH',dirname(__FILE__));
define('WP_AMPM_FILE',__FILE__);

if (!class_exists('ampmAssetsController')) {
	include_once(WP_AMPM_APPPATH.'/controllers/AssetsController.php');
}

// assets
	if (is_admin()) {
		add_action('admin_head', array('ampmAssetsController', 'admin_head'));
	}
