/**
 * Représente le plateau de jeu et les maps disponibles.
 */
export class Board {
    static maps = [
        [
            'ycc)cc^ccw',
            'a        b',
            'a      * b',
            'a    (   b',
            '%        b',
            'a    (   b',
            'a  *     b',
            'a        b',
            'xdd)dd)ddz'
        ],
        [
            'yccccccccw',
            'a        b',
            ')        )',
            'a   *    b',
            'a        b',
            'a    $   b',
            ')   }    )',
            'a        b',
            'xddddddddz',
        ]
    ]

    /**
     * @param {HTMLElement} grid
     * @param {number} width
     * @param {number} tileSize
     */
    constructor(grid, width, tileSize) {
        this.grid = grid
        this.width = width
        this.tileSize = tileSize
        /** @type {HTMLDivElement[]} */
        this.squares = []
    }

    /**
     * Construit la grille pour un niveau donné.
     * @param {number} level
     * @param {(type: 'slicer'|'skeletor', x: number, y: number) => void} onSpawnEnemy
     */
    build(level, onSpawnEnemy) {
        this.squares.length = 0
        const currentMap = Board.maps[level]

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < this.width; j++) {
                const square = document.createElement('div')
                square.setAttribute('id', String(i * this.width + j))

                const char = currentMap[i][j]
                this.addMapElement(square, char, j, i, onSpawnEnemy)

                this.grid.appendChild(square)
                this.squares.push(square)
            }
        }
    }

    /**
     * Applique la classe CSS correspondant à un caractère de map.
     * @param {HTMLDivElement} square
     * @param {string} char
     * @param {number} x
     * @param {number} y
     * @param {(type: 'slicer'|'skeletor', x: number, y: number) => void} onSpawnEnemy
     */
    addMapElement(square, char, x, y, onSpawnEnemy) {
        switch (char) {
            case 'a':
                square.classList.add('left_wall')
                break
            case 'b':
                square.classList.add('right_wall')
                break
            case 'c':
                square.classList.add('top_wall')
                break
            case 'd':
                square.classList.add('bottom_wall')
                break
            case 'w':
                square.classList.add('top_right_wall')
                break
            case 'x':
                square.classList.add('bottom_left_wall')
                break
            case 'y':
                square.classList.add('top_left_wall')
                break
            case 'z':
                square.classList.add('bottom_right_wall')
                break
            case '%':
                square.classList.add('left_door')
                break
            case '^':
                square.classList.add('top_door')
                break
            case '$':
                square.classList.add('stairs')
                break
            case ')':
                square.classList.add('lanterns')
                break
            case '(':
                square.classList.add('fire_pot')
                break
            case '*':
                onSpawnEnemy('slicer', x, y)
                break
            case '}':
                onSpawnEnemy('skeletor', x, y)
                break
        }
    }

    /**
     * Vérifie si une case est franchissable.
     * @param {number} position
     * @returns {boolean}
     */
    canMoveTo(position) {
        if (position < 0 || position >= this.squares.length) return false

        const square = this.squares[position]

        return !square.classList.contains('left_wall') &&
            !square.classList.contains('right_wall') &&
            !square.classList.contains('top_wall') &&
            !square.classList.contains('bottom_wall') &&
            !square.classList.contains('bottom_left_wall') &&
            !square.classList.contains('bottom_right_wall') &&
            !square.classList.contains('top_right_wall') &&
            !square.classList.contains('top_left_wall') &&
            !square.classList.contains('lanterns') &&
            !square.classList.contains('fire_pot')
    }

    /**
     * Vérifie si une coordonnée est un mur.
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isWall(x, y) {
        const position = y * this.width + x
        if (position < 0 || position >= this.squares.length) return true

        const square = this.squares[position]
        return square.classList.contains('left_wall') ||
            square.classList.contains('right_wall') ||
            square.classList.contains('top_wall') ||
            square.classList.contains('bottom_wall') ||
            square.classList.contains('bottom_left_wall') ||
            square.classList.contains('bottom_right_wall') ||
            square.classList.contains('top_right_wall') ||
            square.classList.contains('top_left_wall') ||
            square.classList.contains('lanterns') ||
            square.classList.contains('fire_pot')
    }

    /**
     * @param {number} position
     * @returns {HTMLDivElement}
     */
    getSquare(position) {
        return this.squares[position]
    }
}