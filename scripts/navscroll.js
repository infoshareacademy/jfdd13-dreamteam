//nav animation onscroll

window.addEventListener('scroll', function(e) {
    // console.log(window.scrollY);
    if (window.scrollY > 80) {
        document.querySelector('nav').classList.add('scrolled');
        // document.querySelector('.show_menu').classList.add('scrolled');
    } else{
        document.querySelector('nav').classList.remove('scrolled');
    }
});


