import { Enemy } from './enemy.js'

/**
 * Ennemi se déplaçant horizontalement.
 */
export class Slicer extends Enemy {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} tileSize
     */
    constructor(x, y, tileSize) {
        super(x, y, tileSize, 'slicer', 'slicer')
    }

    /**
     * @param {number} deltaTime
     * @param {import('./board.js').Board} board
     */
    move(deltaTime, board) {
        const speed = 2 * deltaTime
        const newX = this.x + (this.direction * speed)
        const y = Math.round(this.y)

        if (newX < 0 || newX >= board.width || board.isWall(Math.round(newX), y)) {
            this.direction *= -1
        } else {
            this.x = newX
        }

        this.element.style.left = `${this.x * this.tileSize}px`
    }
}