let cursor = document.getElementById("cursor");
const radius = 50
cursor.style.width = `${radius}px`
cursor.style.height = `${radius}px`

cursor.addEventListener('click', () => {

    this.classList.toggle('clicked');
});

window.addEventListener('mousemove', (e) => {
    let mousePosition = {
        x: e.clientX,
        y: e.clientY,
    };
    cursor.style.top = `${mousePosition.y-radius/2}px`;
    cursor.style.left = `${mousePosition.x-radius/2}px`;
});

window.addEventListener('mouseup', () => {
    cursor.style.backgroundColor = '#fff';
    cursor.style.transform = 'scale(1)';
});
window.addEventListener('mousedown', () => {
    cursor.style.backgroundColor = '#dd8';
    cursor.style.transform = 'scale(2)';
});