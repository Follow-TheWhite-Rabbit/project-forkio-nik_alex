const burgerButton = document.querySelector('.hero__burger-button');
const burgerMenu = document.querySelector('.hero__content-burgerMenu');
burgerButton.addEventListener('click', e => {
    burgerMenu.classList.toggle('hero__content-burgerMenu--active')
    burgerButton.classList.toggle('active-burger')
})