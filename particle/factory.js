class ParticleFactory {
    static createRequire(particle){
        const positionX = particle.positionX
        const positionY = particle.positionY
        const velocityX = particle.velocityX
        const velocityY = particle.velocityY
        const radius = particle.radius
        const dencity = particle.dencity
        const mass = radius * radius * dencity
        const buffer = particle.buffer
        return new Particle(positionX, positionY, velocityX, velocityY, radius, mass, buffer)
    }
}