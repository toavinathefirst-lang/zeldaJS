import './style.css'

document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.getElementById("grid");
    const scoreDisplay  =  document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const enemyDisplay = document.getElementById("enemies");

    
    const width = 10
    const tileSize = 48

    const squares = []
    let score = 0
    let level = 0
    let playerPosition = 40
    let enemies = []
    let playerDirection = 'right'
    let gameRunning = true

    //y,w,x,z = corner walls | a,b=side walls |c,d =top/bottom walls
    //)=lanterns |=(=fire pot | %=left door  | ^=top door | $=stairs
    //*=slicer enemy  | }=skeletor enemy | (space) =empty walkable area

   const maps = [
        // Level 1 layout
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
        // Level 2 layout
        [
            'yccccccccw',
            'a        b',
            ')        )',
            'a        b',
            'a        b',
            'a    $   b',
            ')   }    )',
            'a        b',
            'xddddddddz',
        ]
    ]
    function createBoard(){
        gameRunning = true;
        grid.innerHTML="";
        squares.length=0;
        enemies=[]
        for (let i = 0; i < 9; i++) {
        }
    }
})

