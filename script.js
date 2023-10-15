
let popupWindow;
let usernamePopupWindow; 

// Function to validate the form
function validateForm() {
    const username = document.querySelector('.userName').value;
    const password = document.querySelector('.creds').value;

    const usernameRegex = /^[A-Z][a-zA-Z0-9_]{7,}$/;
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,20}$/;

    if (!usernameRegex.test(username)) {
        alert("Username should start with an uppercase letter, contain at least 8 characters, and one special character or number.");
        return false;
    }

    if (!passwordRegex.test(password)) {
        alert("Password should contain at least 8 characters, one special character, and one number.");
        return false;
    }

    return true;
}

// Function to display the form data in a custom popup
function displayDataInPopup() {
    const username = document.querySelector('.userName').value;
    const password = document.querySelector('.creds').value;

    const popupContent = `
        <div class="popup">
            <h2>Form Data</h2>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
            <button id="popupCancel">Cancel</button>
        </div>
    `;

    popupWindow = window.open('', '', 'width=400,height=300');
    popupWindow.document.write(popupContent);

    popupWindow.document.getElementById('popupCancel').addEventListener('click', closePopup);
}

// Function to close the popup window
function closePopup() {
    if (popupWindow) {
        popupWindow.close();
    }
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        // Display the form data in a custom popup window
        displayDataInPopup();
        
        // If "Remember Me" is checked, store the user's details in local storage
        const rememberMe = document.getElementById('myCheckbox').checked;
        if (rememberMe) {
            const username = document.querySelector('.userName').value;
            const password = document.querySelector('.creds').value;
            localStorage.setItem(username + '_password', password);
            localStorage.setItem('rememberedUser', username);
        }
    }
}

// Function to open the "Forgot Password" popup for entering the username
function openForgotPasswordPopup() {
    const rememberMe = document.getElementById('myCheckbox').checked;

    if (rememberMe) {
        const usernamePopupContent = `
            <div class="popup">
                <h2>Forgot Password</h2>
                <p>Enter your username:</p>
                <input type="text" id="forgotUsername" placeholder="Username" />
                <button id="retrievePassword">Retrieve Password</button>
            </div>
        `;

        usernamePopupWindow = window.open('', '', 'width=400,height=300');
        usernamePopupWindow.document.write(usernamePopupContent);

        usernamePopupWindow.document.getElementById('retrievePassword').addEventListener('click', retrievePassword);
    } else {
        alert("Please check the 'Remember Me' checkbox during login to retrieve the password.");
    }
}

// Function to retrieve and display the password
function retrievePassword() {
    const rememberMe = document.getElementById('myCheckbox').checked;

    if (rememberMe) {
        const username = usernamePopupWindow.document.getElementById('forgotUsername').value;
        const storedPassword = localStorage.getItem(username + '_password');

        if (storedPassword) {
            const passwordPopupContent = `
                <div class="popup">
                    <h2>Password Retrieval</h2>
                    <p>Your password is: ${storedPassword}</p>
                </div>
            `;

            const passwordPopupWindow = window.open('', '', 'width=400,height=300');
            passwordPopupWindow.document.write(passwordPopupContent);

            usernamePopupWindow.close();
        } else {
            alert("Password not stored for this username.");
        }
    } else {
        alert("Please check the 'Remember Me' checkbox during login to retrieve the password.");
        usernamePopupWindow.close();
    }
}

// Check if "Remember Me" is checked and populate the form fields
const rememberedUser = localStorage.getItem('rememberedUser');
if (rememberedUser) {
    document.querySelector('.userName').value = rememberedUser;
}

// Event listeners
document.querySelector('.login').addEventListener('click', handleSubmit);
document.querySelector('.cancel').addEventListener('click', closePopup);
document.querySelector('a').addEventListener('click', openForgotPasswordPopup);

// Function to clear form data and reload the page
function clearFormAndReload() {
    document.querySelector('.userName').value = '';
    document.querySelector('.creds').value = '';
    localStorage.removeItem('rememberedUser'); 

    location.reload();
}

document.querySelector('.cancel').addEventListener('click', clearFormAndReload);
