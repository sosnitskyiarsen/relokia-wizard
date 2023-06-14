// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import * as EmailValidator from 'email-validator';

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
    let stepIndex = 1;
    let outPrice = 0;
    function  showWizardStep () {
        $('.wizard_step').hide();
        $(`.wizard_step[data-index="${stepIndex}"]`).show();
        $('.breacrumbs_list li').removeClass('current');
        $(`.breacrumbs_list li[data-index="${stepIndex}"]`).addClass('current');
    }
    showWizardStep();
    function validateFirstStep () {
        if (!$('input[name="name"]').val()) {
            $('input[name="name"]').parent().addClass('alert-input');
            return;
        }

        if (!EmailValidator.validate($('input[name="email"]').val())) {
            $('input[name="email"]').parent().addClass('alert-input');
            return;
        }
        stepIndex++;
        showWizardStep();
    }



    function validateQuantity() {
        const quantityInput = $('input[name="quantity"]'),
            quantityInputValue = Number($(quantityInput).val());

        if (quantityInputValue === 0) {
            quantityInput.parent().addClass('alert-input');
            return;
        }

        if (quantityInputValue > 0 && quantityInputValue <= 10) {
            outPrice = 10;
        } else if (quantityInputValue > 10 && quantityInputValue <= 100) {
            outPrice = 100;
        } else if (quantityInputValue > 100 && quantityInputValue <= 1000) {
            outPrice = 1000;
        } else {
            outPrice = 1000;
        }
        stepIndex++;
        showWizardStep();
    }

    function showPrice () {
        $('#price').text(outPrice);
        $('.btn_accent').eq(0).hide();
        $('.btn_accent').eq(1).show();
    }

    function endWizard () {
        const userName = $('input[name="name"]').val(),
        userEmail = $('input[name="email"]').val(),
            userPhone = $('input[name="phone"]').val(),
            userQuantity = $('input[name="quantity"]').val();

        $.ajax({
            url: adminUrl,
            type: 'POST',
            data: `action=wizard&user-name=${userName}&user-email=${userEmail}&user-phone=${userPhone}&quantity=${userQuantity}`,
            success: function( data ) {
                console.log(data);
               if (data?.status) {
                    $('#good_result').show();
               } else {
                   $('#bad_result').show();
               }
                stepIndex++;
                showWizardStep();
                $('.btn_accent, .btn_back').hide();
                $('#start_again').show();
            }
        });

    }

    $('.btn_accent').on('click', function () {
        if (stepIndex === 1) {
            validateFirstStep();
            return;
        }
        if (stepIndex === 2) {
            validateQuantity();

        }
        if (stepIndex === 3) {
            showPrice();
        }
    });

    $('.btn_back').on('click', function () {
        stepIndex--;
        if (stepIndex < 1) {
            stepIndex = 1;
            return false;
        }

        if (stepIndex < 3) {
            $('.btn_accent').eq(1).hide();
            $('.btn_accent').eq(0).show();
        }
        showWizardStep();
    });
    $('input').on('input', function () {
        $(this).parent().removeClass('alert-input');
    });

    $('input[name="quantity"]').on('input', function (){
        if ($(this).val() > 1000) {
            $(this).val(1000);
        }
    });
    $('#send_email').on('click', function () {
        endWizard();
    });

    $('#start_again').on('click', function () {
        stepIndex = 1;
        showWizardStep();
        $('.btn_accent, .btn_back').show();
        $('#start_again, #send_email').hide();
        $('input').val('');
    });
})
