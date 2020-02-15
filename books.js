// JavaScript code 
function search_foods() { 
    let input = document.getElementById('searchbar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('foods'); 
    document.getElementById("list").style.display = "block";
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input) || input=="") { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        }
    } 
} 

document.addEventListener("click", function(){
 document.getElementById("list").style.display = "none";
 document.getElementById('searchbar').value = "";
});