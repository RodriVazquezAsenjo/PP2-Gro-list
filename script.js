function openNav () {
    let nav = document.getElementById('nav-bar');
    if (nav.style.height === '80px') {
        nav.style.height = '0';
        nav.style.visibility = 'hidden';
    }
    else {
        nav.style.height = '80px';
        nav.style.visibility = 'visible';
    }
    
}