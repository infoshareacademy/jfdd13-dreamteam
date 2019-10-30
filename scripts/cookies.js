const 
    cookieInfo = document.getElementById('cookies'),
    cookieBtn = document.getElementById('cookies__submit'),
    cookie = document.cookie;

const setMyCookie = () => {
    document.cookie ="name=user;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax";
}
    
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

const popUp = () => {
    cookieInfo.style.display = 'block';
    cookieBtn.addEventListener('click', popHide);
}

const popHide = () => {
    cookieInfo.style.display = 'none';
    setMyCookie();
}

const cookieQuest = () => {
    if (getCookie('name') === ''){
        setTimeout(() => popUp(), 1000);
    }
}

cookieQuest();