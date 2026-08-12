import './style.css'
import { Game } from './game.js'

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid')
    const scoreDisplay = document.getElementById('score')
    const levelDisplay = document.getElementById('level')
    const enemyDisplay = document.getElementById('enemies')

    const game = new Game({ grid, scoreDisplay, levelDisplay, enemyDisplay })
    game.start()
})