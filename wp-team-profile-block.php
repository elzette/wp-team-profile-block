<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @package     Semblance\WP_TeamProfile
 * @author      Elzette Roelofse (@semblance_er)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: n
 * Plugin URI:  https://semblance.co.uk
 * Description: WordPress Block to add individual team profiles. Various customisable settings available such as text colours, background and border colours. Choice between square or round profile image. Change alignment of all elements in box. Also add optional LinkedIn, Twitter and Email icons.
 * Version:     1.0.0
 * Author:      Elzette Roelofse
 * Author URI:  https://twitter.com/semblance_er
 * Text Domain: wpteamprofile
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace Semblance\WP_TeamProfile;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';