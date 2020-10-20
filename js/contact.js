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

function validateForm(event) {
  let returnFlag = true;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    returnFlag = false;
  }
  else{
    let response = grecaptcha.getResponse();
    if(response.length == 0) {
      event.preventDefault();
      event.stopPropagation();
      returnFlag = false;
    }
  }
  form.classList.add('was-validated');
  return returnFlag;
}
