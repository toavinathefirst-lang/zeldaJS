/**
 * Représente le joueur (Link).
 */
export class Player {
    /**
     * @param {number} startPosition
     * @param {number} width
     * @param {number} tileSize
     */
    constructor(startPosition, width, tileSize) {
        this.position = startPosition
        this.width = width
        this.tileSize = tileSize
        this.direction = 'right'

        this.element = document.createElement('div')
        this.element.className = 'link_going_right'
        this.element.id = 'player'

        this.updateStyle()
    }

    get x() {
        return this.position % this.width
    }

    get y() {
        return Math.floor(this.position / this.width)
    }

    /** Ajoute l'élément à la grille. */
    mount(grid) {
        grid.appendChild(this.element)
    }

    /** Synchronise la position CSS avec position. */
    updateStyle() {
        this.element.style.left = `${(this.position % this.width) * this.tileSize}px`
        this.element.style.top = `${Math.floor(this.position / this.width) * this.tileSize}px`
    }

    /**
     * Calcule la position candidate pour une direction donnée.
     * @param {string} direction
     * @returns {number}
     */
    computeNextPosition(direction) {
        let newPosition = this.position

        switch (direction) {
            case 'left':
                if (this.position % this.width !== 0) newPosition = this.position - 1
                this.element.className = 'link_going_left'
                this.direction = 'left'
                break
            case 'right':
                if (this.position % this.width !== this.width - 1) newPosition = this.position + 1
                this.element.className = 'link_going_right'
                this.direction = 'right'
                break
            case 'up':
                if (this.position - this.width >= 0) newPosition = this.position - this.width
                this.element.className = 'link_going_up'
                this.direction = 'up'
                break
            case 'down':
                if (this.position + this.width < this.width * 9) newPosition = this.position + this.width
                this.element.className = 'link_going_down'
                this.direction = 'down'
                break
        }

        return newPosition
    }

    /**
     * Applique le déplacement.
     * @param {number} position
     */
    moveTo(position) {
        this.position = position
        this.updateStyle()
    }
}