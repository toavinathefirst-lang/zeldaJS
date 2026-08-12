import { Enemy } from './enemy.js'

/**
 * Ennemi se déplaçant verticalement avec un minuteur de changement de direction.
 */
export class Skeletor extends Enemy {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} tileSize
     */
    constructor(x, y, tileSize) {
        super(x, y, tileSize, 'skeletor', 'skeletor')
        this.timer = Math.random() * 5
    }

    /**
     * @param {number} deltaTime
     * @param {import('./board.js').Board} board
     */
    move(deltaTime, board) {
        const speed = 1.5 * deltaTime
        this.timer -= deltaTime

        if (this.timer <= 0) {
            this.direction *= -1
            this.timer = Math.random() * 5
        }

        const newY = this.y + (this.direction * speed)
        const x = Math.round(this.x)

        if (newY < 0 || newY >= 9 || board.isWall(x, Math.round(newY))) {
            this.direction *= -1
        } else {
            this.y = newY
        }

        this.element.style.top = `${this.y * this.tileSize}px`
    }
}