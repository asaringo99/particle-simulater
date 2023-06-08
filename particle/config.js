const mouseEffectDistance = 500;
const mouseEffectCoefficient = 0.02

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