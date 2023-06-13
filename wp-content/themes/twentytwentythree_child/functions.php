<?php

add_action( 'wp_enqueue_scripts', 'child_styles' );
 
function child_styles() {
 
	wp_enqueue_style( 'child-style', get_stylesheet_directory()  . '/css/app.min.css', array(),  "1.0" );
    wp_enqueue_script('child-scripts',get_stylesheet_directory()  . '/js/app.min.js', array(),  "1.0",true);
}

function r_test_callback( $atts, $shortcode_content = null ) {

    $params = shortcode_atts(
        array(
            'title' => null,
            'description' => $shortcode_content
        ),
        $atts
    );
    ob_start();

    get_template_part( 'parts/reviews' ,"",$params);

    return ob_get_clean();
}

add_shortcode( 'r_test', 'r_test_callback' );