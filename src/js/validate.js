import validate from 'validate.js';
import Toastify from 'toastify-js';
import { AsYouType } from 'libphonenumber-js';
import { parsePhoneNumberFromString as parseMin } from 'libphonenumber-js/max'
import "toastify-js/src/toastify.css"

document.addEventListener('DOMContentLoaded',function() {

    const init = function(el, constraints) {

        const form = el;
        
        form.addEventListener("submit", function(ev) {
            ev.preventDefault();            
            handleFormSubmit(form);
        });

        // Hook up the inputs to validate on the fly
        const inputs = form.querySelectorAll("input, textarea, select");

        for (let i = 0; i < inputs.length; ++i) {
            inputs.item(i).addEventListener("change", function(ev) {
                const errors = validate(form, constraints, { fullMessages: false }) || {};
                showErrorsForInput(this, errors[this.name])
            });
        }

        function handleFormSubmit(form, input) {
            // validate the form against the constraints
            const errors = validate(form, constraints, { fullMessages: false });
            // then we update the form to reflect the results
            showErrors(form, errors || {});
            if (!errors) {
                showSuccess();
            } else {
            }
        };
        
        // Updates the inputs with the validation errors
        function showErrors(form, errors) {
            // We loop through all the inputs and show the errors for that input
            _.each(form.querySelectorAll("[required]"), function(input) {
            // Since the errors can be null if no errors were found we need to handle
            // that
            showErrorsForInput(input, errors && errors[input.name]);
            });
        };

        // Shows the errors for a specific input
        function showErrorsForInput(input, errors) {
            // This is the root of the input
            const formGroup = closestParent(input.parentNode, "form-group")
            // Find where the error messages will be insert into
            , messages = formGroup;
            // First we remove any old messages and resets the classes
            resetFormGroup(formGroup);
            // If we have errors
            if (errors) {
                // we first mark the group has having errors
                formGroup.classList.add("has-error");
                // then we append all the errors
                _.each(errors, function(error) {
                    if (messages) {
                        //addError(messages, error);
                    }
                });
            } else {
                // otherwise we simply mark it as success
                formGroup.classList.add("has-success");
            }
        };

        // Recusively finds the closest parent that has the specified class
        function closestParent(child, className) {
            if (!child || child == document) {
                return null;
            }
            if (child.classList.contains(className)) {
                return child;
            } else {
                return closestParent(child.parentNode, className);
            }
        };
        
        function resetFormGroup(formGroup) {
            // Remove the success and error classes
            formGroup.classList.remove("has-error");
            formGroup.classList.remove("has-success");
            // and remove any old messages
/*
            _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
                el.parentNode.removeChild(el);
            });
*/
        }
        
        // Adds the specified error with the following markup
        // <p class="help-block error">[message]</p>
        function addError(messages, error) {
            const block = document.createElement("p");
            block.classList.add("help-block");
            block.classList.add("error");
            block.innerText = error;
            messages.appendChild(block);
        }

        function startAjax() {
            form.querySelector('button').classList.add('loading');
        }

        function finishAjax() {
            form.querySelector('button').classList.remove('loading');
        }

        const formToJSON = (elements) =>
          [].reduce.call(
            elements,
            (data, element) => {
                if (element.type === 'radio') {
                    if (element.checked) {
                        data[element.name] = element.value;
                    }
                } else {
                
                    if (element.name == 'phone') {
                        data[element.name] = element.value.replaceAll(" ", "");
                    } else {
                        data[element.name] = element.value;
                    }
                }
              return data;
            },
            {},
        );
          
        function submitForm() {
            let xmlHttp = new XMLHttpRequest(), 
                url = form.getAttribute('action');

            xmlHttp.onload = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    Toastify({
                        text: "Dziękujemy za wiadomość!",
                        duration: 3000,
                        className: "info",
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                    }).showToast();
                    form.reset();
                } else { }
               finishAjax();
            };
        
            xmlHttp.open('post', url, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(formToJSON(form.elements)));
        }       
        
        function showSuccess() {
            startAjax();
            submitForm();
        }
        
        // Custom Validate for telephone
        validate.validators.telCheck = function(value, options, key, attributes) {
            
            if (value) {
                let phoneNumber = parseMin(value, 'PL');

                if (phoneNumber.isValid()) {
                    return;
                } else {
                    return 'Enter valid number';
                }
            }
        };
    };
    
    const telFormat = function() {
        let inputs = document.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].type.toLowerCase() == 'tel') {               
               inputs[i].addEventListener("keyup", event => {
                    let val_old = inputs[i].value,
                        val_new = new AsYouType('PL').input(inputs[i].value);
                    inputs[i].value = val_new;                    
                });
            }
        }
    }();
    
    
    // Init
    
    const contactform = ()=> {
        const constraints = {            
            email: {
                presence: { message: "Pole nie może być puste" },
                email: { message: "Podaj poprawny adres" }
            },
            policy: {
                presence: { message: "Zaakceptuj zgodę" },
                inclusion: {
                    within: [true],
                    message: "^Zaakceptuj zgodę"
                }
            },
            rules: {
                presence: { message: "Zaakceptuj zgodę" },
                inclusion: {
                    within: [true],
                    message: "^Zaakceptuj zgodę"
                }
            },
            username: {
                presence: { message: "Pole nie może być puste" },
            },
            tel: {
                presence: { message: "Pole nie może być puste" },
                telCheck: "Podaj poprawny numer"
            }, 
        }; 
        
        init(document.querySelector('.js-contactForm'), constraints);
    };
    
    document.querySelector('.js-contactForm') ? contactform() : false;

}, false);
