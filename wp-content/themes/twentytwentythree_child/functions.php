<?php

add_action( 'wp_enqueue_scripts', 'child_styles' );
 
function child_styles() {
 
	wp_enqueue_style( 'child-style', trailingslashit( get_stylesheet_directory_uri() )  . '/css/app.min.css', array(),  md5_file(get_stylesheet_directory() .'/css/app.min.css'));
    wp_enqueue_script('child-scripts',trailingslashit( get_stylesheet_directory_uri() ) . '/js/app.min.js', array(),  md5_file(get_stylesheet_directory() .'/js/app.min.js'),true);
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

add_action( 'wp_ajax_wizard', 'wizard_ajax' );
add_action( 'wp_ajax_nopriv_wizard', 'wizard_ajax' );

function wizard_ajax(){
    header('Content-Type: application/json; charset=utf-8');
    $message = '';
    foreach ($_POST as $key => $value) {
        if ( $value != "" && $key != "subject"  ) {
            $message .= "<b>{$key}</b>  <i>$value</i>\n ";
        }
    }

    $mail_status = wp_mail(get_bloginfo('admin_email'), 'Wizard-Form', $message);
    echo json_encode([
        'status'=> $mail_status,
        'name'=>$_POST[ 'user-name' ],
        'email'=>$_POST[ 'user-email' ],
        'phone'=>$_POST[ 'user-phone' ]
    ]);
    die;
}