//slide
var slideIndex = 0;
showSlides();

function showSlides(){
	var slides = document.getElementsByClassName("item");

	for(var i = 0; i < slides.length;i++){
		slides[i].className.replace(" item-active","");
		slides[i].style.display = "none";
	}

	slideIndex++;

	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	slides[slideIndex - 1].style.display = "block";
	slides[slideIndex - 1].className += " item-active";
	setTimeout(showSlides,10000);
}