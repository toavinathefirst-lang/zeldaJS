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
    function createPlayer(){
        const playerElement=document.createElement("div");
        playerElement.className = "link_going_right";
        playerElement.id="player";

        playerElement.style.left = `${(playerPosition%width) * tileSize}px`
        playerElement.style.top = `${(playerPosition/width) * tileSize}px`

        grid.appendChild(playerElement);
    }
    function createBoard(){
        gameRunning = true;
        grid.innerHTML="";
        squares.length=0;
        enemies=[];
        const currentMap =maps[level]
        for (let i = 0; i < 9; i++) {
            for(let j=0;j<10;j++){
                const square = document.createElement('div');
                square.setAttribute("id",i*width+j);

                const char = currentMap[i][j];
                addMapElement(square,char,j,i);


                grid.appendChild(square)
                squares.push(square)
            }
        }
        createPlayer()
    }
    createBoard()
    /**
     * @param {string} char 
     * @param {HTMLDivElement} square 
     * @param {number} x 
     * @param {number} y 
     */
    function addMapElement(square,char,x,y){
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
            

        }
    }
})

