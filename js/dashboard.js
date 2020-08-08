const UIusername = document.getElementById('username');
const UIlogOutBtn = document.getElementById('logout-btn');
const heading = document.getElementsByTagName('h1')[0];

UIlogOutBtn.addEventListener('click', logOut);

// Check whether user exists
function checkUser(){
    const username = sessionStorage.getItem('username');

    if(username === null){
        setInterval(() => {
            heading.textContent = `You don't have an account. Redirecting in ${runCountDown()}`;
        }, 1000);

        UIlogOutBtn.style.display = 'none';
    }else{
        // Display username
        heading.textContent = `Welcome ${username}`;
    }
}
checkUser();

// Log the user out
function logOut(){
    // Clear the username from session storage
    sessionStorage.clear();

    // Redirect the user to the homepage
    window.location = 'index.html';
}

let count = 4;

function runCountDown(){
    count --;

    if(count < 0){
        count = 0;
        window.location = 'index.html';
    }

    return count;
}