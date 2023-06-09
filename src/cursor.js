let cursor = document.getElementById("cursor");
const radius = 30
cursor.style.width = `${radius}px`
cursor.style.height = `${radius}px`

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
    cursor.style.backgroundColor = '#f0f';
    cursor.style.transform = 'scale(3)';
});