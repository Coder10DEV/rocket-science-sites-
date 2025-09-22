const hamburger = document.getElementsByClassName('hamburger')[0];
const menu = document.getElementsByClassName('menu')[0];

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
