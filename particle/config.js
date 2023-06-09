const viscocity = 0.9
const defaultParticleSize = 1
const specialParticleSize = 200
const mouseEffectDistance = 500;
const mouseEffectCoefficient = 0.02

const defaultParticle = {
    position: {x: 1, y: 1},
    velocity: {x: 1, y: 1},
    dencity: 0.1,
    radius: 1,
    buffer: 1 * 0.5,
}

const specialParticle = {
    position: {x: 0.5, y: 0.5},
    velocity: {x: 0, y: 0},
    dencity: 1000,
    radius: 200,
    buffer: 200 * 0.5,
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