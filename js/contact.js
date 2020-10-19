
/* Adding tooltips to the form controls */
$(document).ready(function() {

  $('.hastooltip').tooltip();

  let inputTextControls = $('.hastooltip');

  for (let i = 0; i < inputTextControls.length; i++) {
    inputTextControls[i].setAttribute("data-toggle", "tooltip");
    inputTextControls[i].setAttribute("data-animation", "true");
  }

});

/* Form validation */
// Fetch the reference to the form that needs validation
let form = document.querySelector('.needs-validation');

// Add event listener to the form object when submit button is clicked.
form.addEventListener('submit', validateForm);

function validateForm(event){
  if (form.checkValidity() === false)
  {
    console.log("here");
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add('was-validated');
}

$(function () {

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    };

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    };

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.html";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                        grecaptcha.reset();
                    }
                }
            });
            return false;
        }
    });
});
