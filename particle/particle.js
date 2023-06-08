class Particle {
    constructor(x, y, velocityX, velocityY, size, mass, buffer) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.size = size;
        this.baff = buffer;
        this.mass = mass;
    }

    addVelocity(v){
        this.velocityX += v.directionX
        this.velocityY += v.directionY
    }
    
    addVelocityToOpponent(otherParticle, v){
        otherParticle.velocityX += v.directionX
        otherParticle.velocityY += v.directionY
    }

    isCollide(otherParticle){
        let dx = otherParticle.x - this.x;
        let dy = otherParticle.y - this.y;
        let distanceSquare = dx * dx + dy * dy;
        let particleSizeSum = this.size + otherParticle.size
        let patricleSizeSumSquare = particleSizeSum * particleSizeSum
        let buffer = this.baff + otherParticle.baff
        return distanceSquare < patricleSizeSumSquare + buffer
    }
    
    calculateVectorToOpponent(otherParticle){
        let dx = otherParticle.x - this.x;
        let dy = otherParticle.y - this.y;
        return {
            dx: dx,
            dy: dy,
        }
    }

    updateVelocity() {
        this.velocityX *= 0.9;
        this.velocityY *= 0.9;
        particles.forEach(otherParticle => {
            if (this === otherParticle) return;
            if (!this.isCollide(otherParticle)) return
            const vectorToOtherParticle = this.calculateVectorToOpponent(otherParticle)
            const dx = vectorToOtherParticle.dx
            const dy = vectorToOtherParticle.dy
            const distance = Math.sqrt(dx * dx + dy * dy)
            const unitVector = {x: dx / distance, y: dy / distance};
            const v1 = {x: this.velocityX, y: this.velocityY};
            const v2 = {x: otherParticle.velocityX, y: otherParticle.velocityY};

            const v1collitionBefore = v1.x * unitVector.x + v1.y * unitVector.y;
            const v2collitionBefore = v2.x * unitVector.x + v2.y * unitVector.y;

            // Compute the new velocities in the direction of the unitVector
            const totalMass = this.mass + otherParticle.mass;
            const v1collisionAfter = ((this.mass - otherParticle.mass) * v1collitionBefore + 2 * otherParticle.mass * v2collitionBefore) / totalMass;
            const v2collisionAfter = ((otherParticle.mass - this.mass) * v2collitionBefore + 2 * this.mass * v1collitionBefore) / totalMass;

            // Update the velocities in the direction of the unitVector
            const velocitydifference = {
                directionX: (v1collisionAfter - v1collitionBefore) * unitVector.x,
                directionY: (v1collisionAfter - v1collitionBefore) * unitVector.y,
            }
            const velocitydifferenceToOpponent = {
                directionX: (v2collisionAfter - v2collitionBefore) * unitVector.x,
                directionY: (v2collisionAfter - v2collitionBefore) * unitVector.y,
            }
            this.addVelocity(velocitydifference)
            this.addVelocityToOpponent(otherParticle, velocitydifferenceToOpponent)
        });
    }

    update(){
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.velocityX *= -1;
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.velocityY *= -1;
    }

    forceAdded(factor){
        const opponentVelocityX = factor.velocityX
        const opponentVelocityY = factor.velocityY
        const opponentPositionX = factor.positionX
        const opponentPositionY = factor.positionY
        
        if(!canEffectForce(opponentPositionX, opponentPositionY, this.x, this.y)) return
        const vectorToOpponent = this.calculateVectorToOpponent({
            x: opponentPositionX,
            y: opponentPositionY,
        })
        const dx = vectorToOpponent.dx
        const dy = vectorToOpponent.dy
        const dist = Math.sqrt(dx*dx + dy*dy);
        const force = caclucateForce(dist)
        const opponentEffect = calculateEffect(opponentVelocityX, opponentVelocityY)
        this.addVelocity({
            directionX: force * dx / dist * opponentEffect,
            directionY: force * dy / dist * opponentEffect,
        })
        this.addVelocity({
            directionX: opponentVelocityX * force * opponentEffect * 0.1,
            directionY: opponentVelocityY * force * opponentEffect * 0.1,
        })
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}