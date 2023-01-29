let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

const but = document.querySelector("#donatebtn")

window.onscroll = function(){
    if(document.documentElement.scrollTop > 650)
    {
        but.classList.remove("hidden")
        console.log("650 passed")
    }
    else{
        but.classList.add("hidden")
    }
}