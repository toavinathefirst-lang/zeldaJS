/**
 * Effet visuel temporaire de l'attaque du joueur.
 */
export class Kaboom {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} tileSize
     * @param {HTMLElement} grid
     */
    constructor(x, y, tileSize, grid) {
        this.x = x
        this.y = y

        this.element = document.createElement('div')
        this.element.className = 'kaboom'
        this.element.style.left = `${x * tileSize}px`
        this.element.style.top = `${y * tileSize}px`
        grid.appendChild(this.element)

        setTimeout(() => {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element)
            }
        }, 1000)
    }
}