const menu = document.querySelector(".burger-menu");
const mobileMenu = document.querySelector(".menu-mobile");

const toggleMenu = () => {
  mobileMenu.style.display = mobileMenu.style.display==="none"? "block" : "none";

};
menu.addEventListener("click", toggleMenu)
