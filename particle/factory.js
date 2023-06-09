class ParticleFactory {
    static createRequire(particle){
        const positionX = particle.position.x
        const positionY = particle.position.y
        const velocityX = particle.velocity.x
        const velocityY = particle.velocity.y
        const radius = particle.radius
        const dencity = particle.dencity
        const mass = radius * radius * dencity
        const buffer = particle.buffer
        return new Particle(positionX, positionY, velocityX, velocityY, radius, mass, buffer)
    }
    static createDefaultParticle(){
        const particle = defaultParticle
        return this.createRequire(particle)
    }
    static createSpecialParticle(){
        const particle = specialParticle
        return this.createRequire(particle)
    }
}