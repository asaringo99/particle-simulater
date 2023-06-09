const viscocity = 0.92
const defaultParticleSize = 1
const defaultParticleNum = 2000
const defaultParticleDencity = 1
const specialParticleSize = 200
const specialParticleNum = 1
const specialParticleDencity = 1000;

const mouseEffectDistance = 300;
const mouseEffectCoefficient = 0.02

const defaultParticle = {
    position: {x: 1, y: 1},
    velocity: {x: 1, y: 1},
    dencity: defaultParticleDencity,
    radius: defaultParticleSize,
    buffer: defaultParticleSize * 0.5,
}

const specialParticle = {
    position: {x: 1, y: 1},
    velocity: {x: 0, y: 0},
    dencity: specialParticleDencity,
    radius: specialParticleSize,
    buffer: specialParticleSize * 0.5,
}

function canEffectForce(factorPositionX, factorPositionY, nowX, nowY){
    const diffX = (factorPositionX - nowX);
    const diffY = (factorPositionY - nowY);
    return Math.sqrt(diffX * diffX + diffY * diffY) <= mouseEffectDistance
}

function caclucateForce(dist){
    if (dist > mouseEffectDistance) return 0
    const force = (mouseEffectDistance - dist) / mouseEffectDistance;
    return force
}

function calculateEffect(opponentVelocityX, opponentVelocityY){
    const effectFactor = Math.sqrt(opponentVelocityX*opponentVelocityX + opponentVelocityY*opponentVelocityY) * mouseEffectCoefficient;
    return effectFactor
}