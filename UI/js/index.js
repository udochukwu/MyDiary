window.onload = function() {

    // Get all modals  
    var loginModal = document.getElementById('loginModal');
    var registerModal = document.getElementById('registerModal');
    
    
    // Get the elements that closes the modals
    var loginClsBtn = document.getElementById("loginClsBtn");
    var registerClsBtn = document.getElementById("registerClsBtn");
    
    // Get the elements that opens the modals
    var loginBtn = document.getElementById("loginBtn");
    var registerBtn = document.getElementById("registerBtn");
    var bigRegisterBtn = document.getElementById("bigRegisterBtn");
    
    
    // When the user clicks on the button, open the modals
    loginBtn.onclick = function(e) {
         e.preventDefault();    
        loginModal.style.display = "block";
    }
    registerBtn.onclick = function(e) {
        e.preventDefault();    
        registerModal.style.display = "block";
    }
    bigRegisterBtn.onclick = function(e) {
        e.preventDefault();    
        registerModal.style.display = "block";
    }
    
    // When the user clicks on the close btn, close the modals
    loginClsBtn.onclick = function() {
        loginModal.style.display = "none";
    }
    registerClsBtn.onclick = function() {
        registerModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close the modals
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
    } 
    
    }