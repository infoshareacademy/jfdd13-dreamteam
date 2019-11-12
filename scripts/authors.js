const authors = () => {

    const authorsWrapper = document.querySelector('.authors__wrapper');
    const authorsOutput = document.querySelector('.authors__output');
    const authImgs = document.querySelectorAll('.card__img');
    const imgInner =


        authImgs.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const newEl = document.createElement('div.card__img--back');
                item.classList.toggle('card__img--transform');
                newEl.style.background = '#bdbdbd';
                newEl.style.width = '75px';
                newEl.style.height = '75px';
                newEl.style.zIndex = '10';
                item.appendChild(newEl)
            });
            item.addEventListener('mouseleave', () => {
                item.classList.toggle('card__img--transform');
                item.removeChild('div');
            })
        });

    function authorsModal() {
        // const modalWindow =
    }
};

export default authors