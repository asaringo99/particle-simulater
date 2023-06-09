particles = []

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// canvas.style.border = '2px solid black'
// canvas.style.top = '160px'
// canvas.style.left = '10px'
// canvas.style.alignItems = 'center'
let isMouseDown = false;
canvas.addEventListener('mousedown', function(e) {
    isMouseDown = true;
});
canvas.addEventListener('mouseup', function(e) {
    isMouseDown = false;
});
canvas.addEventListener('mousemove', function(e) {
    let mouse = {x: e.clientX, y: e.clientY};
    let prevMouse = this.prevMouse || mouse;
    let mouseVelocityX = mouse.x - prevMouse.x;
    let mouseVelocityY = mouse.y - prevMouse.y;

    particles.forEach(particle => {
        if (!isMouseDown) return;
        particle.forceAdded({
            velocityX: mouseVelocityX,
            velocityY: mouseVelocityY,
            positionX: mouse.x,
            positionY: mouse.y,
        })
    });
    this.prevMouse = mouse;
});

let button = document.createElement('button');
button.style.position = 'absolute';
button.style.borderRadius = '50%';
button.style.top = '40px';
button.style.right = '40px';
button.style.width = '100px';
button.style.height = '100px';
button.style.fontSize = '30px';
button.textContent = '+';
button.addEventListener('click', () => {
    let particle = ParticleFactory.createDefaultParticle()
    particle.changePositionByRatio({x: canvas.width, y: canvas.height})
    particle.toRandomPosition()
    particle.toRandomVelocity()
    particles.push(particle);
});
document.body.appendChild(button);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
        particle.updateVelocity();
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

for (let i = 0; i < 1; i++) {
    const particle = ParticleFactory.createSpecialParticle()
    particles.push(particle);
}
for (let i = 0; i < 2000; i++) {
    const particle = ParticleFactory.createDefaultParticle()
    particles.push(particle);
}

particles.map((particle) => {
    particle.changePositionByRatio({x: canvas.width, y: canvas.height})
    particle.toRandomPosition()
    particle.toRandomVelocity()
    return particle
})