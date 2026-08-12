import { Board } from './board.js'
import { Player } from './player.js'
import { Slicer } from './slicer.js'
import { Skeletor } from './skeletor.js'
import { Kaboom } from './kaboom.js'

/**
 * Orchestre Board, Player et les Enemy, gère la boucle de jeu.
 */
export class Game {
    /**
     * @param {{grid: HTMLElement, scoreDisplay: HTMLElement, levelDisplay: HTMLElement, enemyDisplay: HTMLElement}} elements
     */
    constructor({ grid, scoreDisplay, levelDisplay, enemyDisplay }) {
        this.grid = grid
        this.scoreDisplay = scoreDisplay
        this.levelDisplay = levelDisplay
        this.enemyDisplay = enemyDisplay

        this.width = 10
        this.tileSize = 48

        this.score = 0
        this.level = 0
        /** @type {import('./enemy.js').Enemy[]} */
        this.enemies = []
        this.gameRunning = true

        this.board = new Board(this.grid, this.width, this.tileSize)
        this.player = new Player(40, this.width, this.tileSize)

        this.lastTime = 0
        this.animationId = null

        this.handleKeydown = this.handleKeydown.bind(this)
        this.gameLoop = this.gameLoop.bind(this)

        document.addEventListener('keydown', this.handleKeydown)
    }

    /** Démarre le jeu. */
    start() {
        this.createBoard()
        this.animationId = requestAnimationFrame(this.gameLoop)
    }

    /** Construit le plateau et le joueur pour le niveau courant. */
    createBoard() {
        this.gameRunning = true
        this.grid.innerHTML = ''
        this.enemies = []

        this.board.build(this.level, (type, x, y) => this.spawnEnemy(type, x, y))

        this.player.mount(this.grid)
        this.updateDisplay()
    }

    /**
     * Instancie et enregistre un ennemi.
     * @param {'slicer'|'skeletor'} type
     * @param {number} x
     * @param {number} y
     */
    spawnEnemy(type, x, y) {
        let enemy
        if (type === 'slicer') {
            enemy = new Slicer(x, y, this.tileSize)
        } else if (type === 'skeletor') {
            enemy = new Skeletor(x, y, this.tileSize)
        }
        this.enemies.push(enemy)
        enemy.mount(this.grid)
    }

    /** Met à jour l'affichage du score, du niveau et du nombre d'ennemis. */
    updateDisplay() {
        this.scoreDisplay.innerHTML = this.score
        this.levelDisplay.innerHTML = this.level + 1
        this.enemyDisplay.innerHTML = this.enemies.length
    }

    /**
     * Déplace le joueur dans une direction.
     * @param {string} direction
     */
    movePlayer(direction) {
        const newPosition = this.player.computeNextPosition(direction)

        if (this.board.canMoveTo(newPosition)) {
            const square = this.board.getSquare(newPosition)

            if (square.classList.contains('left_door')) {
                square.classList.remove('left_door')
            }

            if (square.classList.contains('top_door') || square.classList.contains('stairs')) {
                if (this.enemies.length === 0) {
                    this.nextLevel()
                } else {
                    this.showEnemiesRemainingMessage()
                }
                return
            }

            this.player.moveTo(newPosition)
            this.checkPlayerEnemyCollision()
        }
    }

    /** Passe au niveau suivant. */
    nextLevel() {
        this.level = (this.level + 1) % Board.maps.length
        this.createBoard()
    }

    /** Affiche l'alerte "ennemis restants". */
    showEnemiesRemainingMessage() {
        this.grid.style.filter = `hue-rotate(0deg) saturate(2) brightness(1.5)`
        this.grid.style.boxShadow = '0 0 20px red'

        setTimeout(() => {
            this.grid.style.filter = ''
            this.grid.style.boxShadow = ''
        }, 300)

        this.showTemporaryMessage('Defeat all enemies first!!!', 'red', 2000)
    }

    /**
     * Affiche un message temporaire.
     * @param {string} message
     * @param {string} color
     * @param {number} duration
     */
    showTemporaryMessage(message, color, duration) {
        const existingMessage = document.getElementById('temp_message')
        if (existingMessage) existingMessage.remove()

        const messageElement = document.createElement('div')
        messageElement.id = 'temp_message'
        messageElement.textContent = message
        messageElement.style.color = color
        this.grid.appendChild(messageElement)

        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove()
            }
        }, duration)
    }

    /** Déclenche l'attaque du joueur devant lui. */
    spawnKaboom() {
        let kaboomX = this.player.x
        let kaboomY = this.player.y

        switch (this.player.direction) {
            case 'left':
                kaboomX -= 1
                break
            case 'right':
                kaboomX += 1
                break
            case 'up':
                kaboomY -= 1
                break
            case 'down':
                kaboomY += 1
                break
        }

        if (kaboomX >= 0 && kaboomX < this.width && kaboomY >= 0 && kaboomY < 9) {
            new Kaboom(kaboomX, kaboomY, this.tileSize, this.grid)
            this.checkKaboomEnemyCollision(kaboomX, kaboomY)
        }
    }

    /**
     * Vérifie si l'attaque touche un ennemi.
     * @param {number} kaboomX
     * @param {number} kaboomY
     */
    checkKaboomEnemyCollision(kaboomX, kaboomY) {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i]
            const enemyX = Math.round(enemy.x)
            const enemyY = Math.round(enemy.y)

            if (enemyX === kaboomX && enemyY === kaboomY) {
                enemy.remove()
                this.enemies.splice(i, 1)
                this.score++
                this.updateDisplay()
                break
            }
        }
    }

    /** Vérifie si le joueur touche un ennemi. */
    checkPlayerEnemyCollision() {
        const playerX = this.player.x
        const playerY = this.player.y

        for (const enemy of this.enemies) {
            const enemyX = Math.round(enemy.x)
            const enemyY = Math.round(enemy.y)

            if (enemyX === playerX && enemyY === playerY) {
                this.gameOver()
                return
            }
        }
    }

    /** Termine la partie. */
    gameOver() {
        this.gameRunning = false
        this.showTemporaryMessage(`GameOver! Final Score:${this.score}`, 'white', 3000)
    }

    /**
     * Déplace tous les ennemis.
     * @param {number} deltaTime
     */
    moveEnemies(deltaTime) {
        for (const enemy of this.enemies) {
            enemy.move(deltaTime, this.board)
        }
    }

    /**
     * Gère les touches clavier.
     * @param {KeyboardEvent} e
     */
    handleKeydown(e) {
        if (!this.gameRunning) return

        switch (e.code) {
            case 'ArrowLeft':
                e.preventDefault()
                this.movePlayer('left')
                break
            case 'ArrowRight':
                e.preventDefault()
                this.movePlayer('right')
                break
            case 'ArrowUp':
                e.preventDefault()
                this.movePlayer('up')
                break
            case 'ArrowDown':
                e.preventDefault()
                this.movePlayer('down')
                break
            case 'Space':
                this.spawnKaboom()
                break
        }
    }

    /**
     * Boucle de jeu appelée à chaque frame.
     * @param {number} currentTime
     */
    gameLoop(currentTime) {
        const deltaTime = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime

        if (this.gameRunning && deltaTime < 0.1) {
            this.moveEnemies(deltaTime)
            this.checkPlayerEnemyCollision()
        }

        this.animationId = requestAnimationFrame(this.gameLoop)
    }
}