window.onload = function() {

    //Hide side bar on click
    navClsBtn.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "none";
    }

    //display side bar on click
    bars.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("mySidebar").style.display = "block";
    }
    
    //when edit button is clicked make test-input editable
    editBtn.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("entryTitle").readOnly = false;
        document.getElementById("entryContent").readOnly = false;        
        document.getElementById("entryTitle").focus();                   
        document.getElementById("editBtn").style.display = "none";   
        document.getElementById("saveBtn").style.display = "block";                     
    }

    //when save button is clicked make test-input readonly    
    saveBtn.onclick = function(e) {
        e.preventDefault();    
        document.getElementById("entryTitle").readOnly = true;    
        document.getElementById("entryContent").readOnly = true;                                            
        document.getElementById("saveBtn").style.display = "none";   
        document.getElementById("editBtn").style.display = "block";                     
    }
}