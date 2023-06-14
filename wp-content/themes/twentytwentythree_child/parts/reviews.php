<section class="wizard_section">
    <div class="container">
        <div class="row">
            <div class="wizard_block col-md-10 mx-md-auto py-5">
                    <ul class="breacrumbs_list px-0">
                        <li>
                            <img width="16" height="16" src="<?php echo get_stylesheet_directory_uri() ?>/images/svg/main.svg" alt="main">
                        </li>
                        <li data-index="1">
                            <span class="breadcrumb__inner">
                                <span class="breadcrumb__title">Contact info</span>
                            </span>
                        </li>
                        <li data-index="2">
                            <span class="breadcrumb__inner" >
                                <span class="breadcrumb__title">Quantity</span>
                            </span>
                        </li>
                        <li data-index="3">
                            <span class="breadcrumb__inner">
                                <span class="breadcrumb__title">Price</span>
                            </span>
                        </li>
                        <li data-index="4">
                            <span class="breadcrumb__inner">
                                <span class="breadcrumb__title">Done</span>
                            </span>
                        </li>
                    </ul>
                <div class="wizard_step" data-index="1">
                    <h1>Contact Info</h1>
                    <div class="inputs-group-wrapper mx-md-auto">

                        <div class="form-inputs row">
                            <div class="col-md-2 input_title">
                                <label for="name">Name</label>
                            </div>
                            <div class="col-md-10" data-alert="Enter your name">
                                <input type="text" name="name" required class="input-control" >
                            </div>
                        </div>
                        <div class="form-inputs row">
                            <div class="col-md-2 input_title">
                                <label for="email" class="required">Email</label>
                            </div>
                            <div class="col-md-10" data-alert="Enter correct email">
                                <input type="text"  name="email" required class="input-control" >
                            </div>
                        </div>
                        <div class="form-inputs row">
                            <div class="col-md-2 input_title">
                                <label for="phone">Phone</label>
                            </div>
                            <div class="col-md-10">
                                <input type="tel" name="phone" class="input-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wizard_step" data-index="2">
                    <h1>Quantity</h1>
                    <div class="inputs-group-wrapper mx-md-auto">

                        <div class="form-inputs row">
                            <div class="col-md-2 input_title">
                                <label for="quantity" class="required">Quantity</label>
                            </div>
                            <div class="col-md-10" data-alert="Enter quantity greater than 0">
                                <input type="text" name="quantity" required class="input-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wizard_step" data-index="3">
                    <h1>Price</h1>
                    <div>
                        <h2>
                            $<span id="price">0</span>
                        </h2>
                    </div>
                </div>
                <div class="wizard_step" data-index="4">
                    <h1>Done</h1>
                    <div class="mx-md-auto">
                        <p id="good_result" class="hide">✅ Your email was send successfully</p>
                        <p id="bad_result" class="hide">⚠️ We cannot send you email right now. Use alternative way to contact us </p>
                    </div>
                </div>
                <div class="wizard_bottom d-flex align-items-center">
                    <button class="btn btn_accent">
                        Continue
                    </button>

                    <button class="btn btn_accent btn_hide" id="send_email">
                        Send to Email
                    </button>

                    <button class="btn btn_accent btn_hide" id="start_again">
                        Start again ->
                    </button>

                    <button class="btn btn_back">
                        <- Back
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<section>
    <div class="container">
        <div class="row mt-5">
            <h3 class="col-md-9 mx-md-auto">
                <?php print_r($args['title']) ?>
            </h3>
            <p class="col-md-9 mx-md-auto">
                <?php echo $args['description'] ?>
            </p>
        </div>
    </div>
</section>

<script>
    var adminUrl = '<?php echo admin_url( "admin-ajax.php" ) ?>';
</script>
