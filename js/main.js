// Toggle Nav Menu
const menuBar = document.getElementById('menu-bar');
const navMenu = document.getElementById('nav-menu');

// Toggle navigation menu in mobile phones
menuBar.addEventListener('click', toggleNavMenu);
function toggleNavMenu(e){
    e.preventDefault();

    navMenu.classList.toggle('active');
}

// Modal Display
const modal = document.querySelector('.modal-wrapper');
const modalBtn = document.getElementById('modal-btn');
const closeBtn = document.getElementById('closebtn');

// Function to open modal
modalBtn.addEventListener('click', openModal);
function openModal(){
    modal.style.display = 'block';
}

// Function to close modal
closeBtn.addEventListener('click', closeModal);
function closeModal(){
    modal.style.display = 'none';

    signupForm.reset();
}

// Function to close modal if outside is clicked
window.addEventListener('click', clickOutside);
function clickOutside(e){
    if(e.target.className === 'modal'){
        closeModal();
    }
}

// Form Validation Script
const signupForm = document.getElementById('signup-form');
const inputs = document.querySelectorAll('input');
const select = document.querySelector('select');

const allFields = Array.from(inputs);
allFields.push(select);

// Manage Event Listeners
function manageEvents(){
    // Validate all fields when the form is submitted
    signupForm.addEventListener('submit', validateFields);

    allFields.forEach(field => {
        field.addEventListener('blur', validateField);
    })
}
manageEvents();

// Sign Up FormValidation
function validateFields(e){
    // Prevent the default behaviour of the form
    e.preventDefault();

    // Validate the length of the fields
    allFields.forEach(field => {
        if(field.value === ''){
            // Add a class of field-enpty
            field.classList.add('field-empty');

            // Show an error message to the user
            showMessage(`${document.querySelector('.field-empty').getAttribute('placeholder')} field cannot be left empty`, 'error');

            // Focus on the empty field
            document.querySelector('.field-empty').focus();

            document.querySelector('.field-empty').style.borderColor = '#ff432a';
        }else{
            // Remove the class field-empty
            field.classList.remove('field-empty');
    
            // Validate the password fields
            validatePasswords();
        }
    })

    if(document.querySelector('.field-empty') === null && document.querySelector('.password-error') === null){
        signUp(document.querySelector('#fullname').value);
    }
}

// Change the border color of the fields
// function changeColor(field, color){
//     field.style.borderColor = color;
// }

function validatePasswords(){
    const UIpassword = document.getElementById('password');
    const UIcPassword = document.getElementById('c-password');

    // Validate the length of the password field
    if(UIcPassword.value.length < 6){
        UIpassword.classList.add('password-error');

        showMessage('Password must contain 6 or more characters', 'error');

        document.querySelector('.password-error').focus();
        
        document.querySelector('.password-error').style.borderColor = '#ff432a';
    }else{
        UIpassword.classList.remove('password-error');
    }
    
    if(UIpassword.value !== UIcPassword.value){
        UIpassword.classList.add('password-error');
        UIcPassword.classList.add('password-error');

        showMessage('Passwords do not match', 'error');

        document.querySelector('.password-error').focus();
        document.querySelector('.password-error').style.borderColor = '#ff432a';
    }else{
        UIcPassword.classList.remove('password-error');
        UIcPassword.classList.remove('password-error');
    }
}

function validateField(e){
    const field = e.target;

    if(field.value === ''){
        field.classList.add('field-empty');

        field.style.borderColor = '#ff432a';

    }else{
        field.classList.remove('field-empty');

        field.style.borderColor = '#016bff';
    }
}


let timerID;

function showMessage(message, type){
    if(document.querySelector('.alert') !== null){
        document.querySelector('.alert').remove();
    }

    const div = document.createElement('div');
    div.className = `alert alert-${type} text-center fadein`;
    div.appendChild(document.createTextNode(message));

    // Insert the error message in the form
    signupForm.insertBefore(div, document.querySelector('.form-group'));

    clearInterval(timerID);

    timerID = setTimeout(() => {
        removeMessage();
    }, 3000)
}

function removeMessage(){
    if(document.querySelector('.alert') !== null){
        document.querySelector('.alert').remove();
    }
}

// Password Hider and Unhider
const eyes = document.querySelectorAll('.fas.fa-eye');
eyes.forEach(eye => {
    eye.addEventListener('click', togglePassword);
})

function togglePassword(e){
    const field = e.target.previousElementSibling;
    let hidden = true;

    if(e.target.classList.contains('fa-eye')){
        hidden = false;
        passwordToggler(field, 'text', 'fas fa-eye-slash', e.target);

    }else if(e.target.classList.contains('fa-eye-slash')){
        hidden = true;
        passwordToggler(field, 'password', 'fas fa-eye', e.target);
    }    
}

function passwordToggler(field, type, className, icon){
    field.type = type;
    icon.className = className;
}

function clearForm(){
    while(signupForm.firstChild){
        signupForm.firstChild.remove();
    }
}

function signUp(fullname){
    // Clear the content of the signup form so the spinner can be inserted
    clearForm();

    // Create a new image element as the spinner
    const spinner = document.createElement('img');
    spinner.src = 'img/spinner.gif';
    spinner.className = 'success-image';

    // Display the spinner
    signupForm.appendChild(spinner);

    setTimeout(() => {
        document.querySelector('.success-image').remove();

        // Create a new image with the registration gif
        const successImage = document.createElement('img');
        successImage.src = 'img/payment_successful.gif';
        successImage.className = 'success-image';

        signupForm.appendChild(successImage);

        sessionStorage.setItem('username', fullname);

        setTimeout(() => {
            window.location = 'dashboard.html';
        }, 5000);
    }, 3000);
}