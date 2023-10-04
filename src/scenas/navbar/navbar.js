document.addEventListener('DOMContentLoaded', function() {
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sideBar = document.getElementById('sidebar');
    
    menuBar.addEventListener('click', function() {
        sideBar.classList.toggle('hide');
    });
});