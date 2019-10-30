function cookieQuest() {
    const
        cookieInfo = document.getElementById('cookies'),
        cookieBtn = document.getElementById('cookies__submit');
    let cookieItem = document.cookie;

    const setMyCookie = () => {
        cookieItem ="name=user;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax";
    };


    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const popUp = () => {
        cookieInfo.style.display = 'block';
        cookieBtn.addEventListener('click', popHide);
    };

    const popHide = () => {
        cookieInfo.style.display = 'none';
        setMyCookie();
    };

    const cookiePop = () => {
        if (getCookie('name') === ''){
            setTimeout(() => popUp(), 1000);
        }
    };

    cookiePop();
}

cookieQuest();