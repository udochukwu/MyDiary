window.onload = function() {
    // When the user clicks on the button, open the modals
    navClsBtn.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "none";
    }
    bars.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "block";
    }
}