var gameTab = document.querySelectorAll("th");

for(var i=0;i<36;i++){
  gameTab[i].addEvenListener("click", function() {
    gameTab[i].textContent = 1;
    });
}
