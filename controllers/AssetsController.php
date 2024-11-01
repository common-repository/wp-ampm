<?php if (!defined('WPINC')) die();

class ampmAssetsController {	
	
	public static function admin_head() {
		
		// styles
			wp_enqueue_style(
				'wp-ampm',
				plugins_url('css/wp-ampm.css',  WP_AMPM_FILE));
		
		// scripts
			wp_enqueue_script(
				'wp-ampm',
				plugins_url('js/wp-ampm.js', WP_AMPM_FILE),
				array('jquery')
			);
	}
	
}
