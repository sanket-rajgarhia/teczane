/* Adding tooltips to the form controls */
/* ###########################################################################*/
$(document).ready(function() {

  $('.hastooltip').tooltip();

  let inputTextControls = $('.hastooltip');

  for (let i = 0; i < inputTextControls.length; i++) {
    inputTextControls[i].setAttribute("data-toggle", "tooltip");
    inputTextControls[i].setAttribute("data-animation", "true");
  }

});

/* Form validation and Recaptcha validation */
/* ###########################################################################*/
// Fetch the reference to the form that needs validation
let form = document.querySelector('.needs-validation');

// Add event listener to the form object when submit button is clicked.
form.addEventListener('submit', validateForm);

/* Callback function to perform validation when 'submit' button is clicked */
function validateForm(event) {

  // Flags that are true if form control validity and recaptcha validity passes successfully
  let validityFlag = true;
  let captchaFlag = true;

  // Validate form input controls
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();

    returnFlag = false;
  }

  // Validate recaptcha v2
  let response = grecaptcha.getResponse();
  if (response.length == 0) {
    event.preventDefault();
    event.stopPropagation();
    captchaFlag = false;
  }

  form.classList.add('was-validated');

  // Return true only if both validation passes
  if (validityFlag === false && captchaFlag === false) {
    return false;
  } else {
    return validityFlag && captchaFlag;
  }

}

/* Callback fucntion for recaptcha - data-callback  when recaptcha response is a success */
function verifyRecaptchaCallback(response) {
  $('input[data-recaptcha]').val(response).trigger('change');
}

/* Callback fucntion for recaptcha - data-expired-callbackk when recaptcha v2 expires */
function expiredRecaptchaCallback() {
  $('input[data-recaptcha]').val("").trigger('change');
}
