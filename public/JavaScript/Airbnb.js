let slideIndex = [1, 1, 1]; // Updated for three slideshows
let slideId = ["mySlides1", "mySlides2", "mySlides3"]; // Updated for three slideshows

// Initialize the slideshows
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2); // Initialize the third slideshow

// Function to change slides
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

// Function to display slides
function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}
