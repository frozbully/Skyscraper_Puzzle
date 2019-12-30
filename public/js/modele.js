var rafraichir = window.getElementById('recommencer');
rafraichir.addEventListener('click', location.reload(), false);



function randomImg(){

  var tabImage = new Array();
  tabImage[0] = "GratteCiel0.jpg";
  tabImage[1] = "GratteCiel1.jpg";
  tabImage[2] = "GratteCiel2.jpg";
  tabImage[3] = "GratteCiel3.jpg";
  tabImage[4] = "GratteCiel4.jpg";
  tabImage[5] = "GratteCiel5.jpg";

  document.getElementById('image').src += tabImage[Math.floor(Math.random() *tabImage.length)];
}
