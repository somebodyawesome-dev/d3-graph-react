const menuButton = document.querySelector('.menu-button');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', function() {
  navbar.classList.toggle('menu-open'); // Add a class to indicate menu is open
});
