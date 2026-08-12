/**
 * Classe abstraite représentant un ennemi.
 */
export class Enemy {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} tileSize
     * @param {string} type
     * @param {string} className
     */
    constructor(x, y, tileSize, type, className) {
        if (new.target === Enemy) {
            throw new TypeError('Enemy est une classe abstraite, instancie Slicer ou Skeletor')
        }

        this.x = x
        this.y = y
        this.direction = -1
        this.type = type
        this.tileSize = tileSize

        this.element = document.createElement('div')
        this.element.classList.add(className)
        this.element.style.left = `${x * tileSize}px`
        this.element.style.top = `${y * tileSize}px`
    }

    /** Ajoute l'élément à la grille. */
    mount(grid) {
        grid.appendChild(this.element)
    }

    /** Retire l'élément du DOM. */
    remove() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element)
        }
    }

    /**
     * Déplace l'ennemi, à implémenter par les sous-classes.
     * @param {number} deltaTime
     * @param {import('./board.js').Board} board
     */
    move(deltaTime, board) {
        throw new Error(`move() n'est pas implémenté pour ${this.constructor.name}`)
    }
}