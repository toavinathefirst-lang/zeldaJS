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
            'a   *    b',
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
    /**
     * 
     * @param {string} direction 
     */
    function movePlayer(direction){
        const playerElement = document.getElementById('player');
        let newPosition = playerPosition;

        switch(direction){
            case 'left':
                if (playerPosition % width !==0) newPosition = playerPosition -1
                playerElement.className = 'link_going_left'
                playerDirection = 'left'
                break
            case 'right':
                if (playerPosition % width !== width-1) newPosition = playerPosition +1
                playerElement.className = 'link_going_right'
                playerDirection = 'right'
                break
            case 'up':
                if (playerPosition - width >=0) newPosition = playerPosition - width
                playerElement.className = 'link_going_up'
                playerDirection = 'up'
                break
            case 'down':
                if (playerPosition + width < width * 9) newPosition = playerPosition + width
                playerElement.className = 'link_going_down'//classList.add ici serait faux car les classe vont s ajouter 
                playerDirection = 'down'
                break
        }
        playerPosition=newPosition
        playerElement.style.left=`${(playerPosition%width) *tileSize}px`
        playerElement.style.top=`${Math.floor(playerPosition/width) *tileSize}px`
    }
    function createSlicer(x,y){
        const slicerElement= document.createElement("div");
        slicerElement.classList.add("slicer");
        slicerElement.style.left = `${x*tileSize}px`
        slicerElement.style.top  = `${y*tileSize}px`
        const slicer ={
            x,
            y,
            direction:-1,
            type:'slicer',
            slicerElement
        }
        enemies.push(slicer)
        grid.appendChild(slicerElement)

    }
    function createSkeletor(x,y){
        const skeletorElement= document.createElement("div");
        skeletorElement.classList.add("skeletor");
        skeletorElement.style.left = `${x*tileSize}px`
        skeletorElement.style.top  = `${y*tileSize}px`

        const skeletor = {
            x,y,
            direction:-1,
            time:Math.random() *5,//minuteur de 0 a 5s
            type: 'skeletor',
            element: skeletorElement
        }
        enemies.push(skeletor)
        grid.appendChild(skeletorElement)

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
            case '*':
                createSlicer(x,y)
                break;
            case '}':
                createSkeletor(x,y)
                break
            

        }
    }
    document.addEventListener("keydown",(e)=>{
        if(!gameRunning) return

        switch (e.code) {
            case "ArrowLeft":
                e.preventDefault()
                movePlayer("left")
                
                break;
            case "ArrowRight":
                e.preventDefault()
                movePlayer("right")
                
                break;
            case "ArrowUp":
                e.preventDefault()
                movePlayer("up")
                
                break;
            case "ArrowDown":
                e.preventDefault()
                movePlayer("down")
                
                break;
            case "Space":
               // spawnKaboom()
               break;
        
            
        }
    })
})

