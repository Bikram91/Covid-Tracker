const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    console.log(navLinks[0].innerHTML)

    burger.addEventListener('click', () => {
        // console.log(nav)

        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            link.style.animation = `navlLinkFade 1.5s ease forwards ${index / 7 + 5}s`;
    
        });
    });
}

export default navSlide