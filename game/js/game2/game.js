class Board {
    constructor(dom, children, btns, minX, maxX, minY, maxY) {
        this.dom = dom
        this.children = children
        this.btns = btns
        this.minX = minX
        this.maxX = maxX
        this.minY = minY
        this.maxY = maxY
    }
}
class BoardElement {
    constructor(
        name,
        dom,
        id,
        position = { x: "", y: "" },
        size = { w: "", h: "" },
        speed,
        type,
        destroyed
    ) {
        this.name = name
        this.dom = dom
        this.id = id
        this.position = position
        this.position.x = position.x
        this.position.y = position.y
        this.size = size
        this.size.w = size.w
        this.size.h = size.h
        this.speed = speed
        this.type = type
        this.destroyed = destroyed
    }
    changePosition() {
        this.dom.style.left = `${this.position.x}px`
        this.dom.style.top = `${this.position.y}px`
    }
    move(direction) {
        if (typeof direction !== "string" || this.destroyed === true) {
            return
        }
        switch (direction.toLowerCase()) {
            case "left":
                this.position.x -= this.speed
                this.changePosition()

                break
            case "right":
                this.position.x += this.speed
                this.changePosition()

                break
            case "up":
                this.position.y -= this.speed
                this.changePosition()

                break
            case "down":
                this.position.y += this.speed
                this.changePosition()
                break
            default:
                null
        }
    }
}
class Player extends BoardElement {
    constructor(
        name,
        dom,
        id,
        position = { x: "", y: "" },
        size = { w: "", h: "" },
        speed,
        type,
        destroyed
    ) {
        super(name, dom, id, position, size, speed, type, destroyed)
    }
    keySupport = e => {
        switch (e.key) {
            case "ArrowLeft":
                this.position.x >= 1 ? this.move("left") : null
                break
            case "ArrowRight":
                this.position.x <= 599 - this.size.w ? this.move("right") : null
                break
            case "ArrowUp":
                this.position.y >= 1 ? this.move("up") : null
                break
            case "ArrowDown":
                this.position.y <= 599 - this.size.h ? this.move("down") : null
        }
    }
}

class Game {
    constructor() {
        this.activeListeners = []
        this._score = 0
    }
    getBoard() {
        return document.getElementById("board")
    }
    getBtns() {
        return Array.from(document.querySelectorAll(".js-board__btn"))
    }
    board = new Board(
        this.getBoard(),
        [],
        this.getBtns(),
        0,
        this.getBoard().offsetWidth,
        0,
        this.getBoard().offsetHeight
    )
    create(type) {
        const createPlayer = () => {
            return this.board.children.push(
                new Player(
                    "player",
                    document.getElementById("player"),
                    0,
                    {
                        x: 160,
                        y: 160,
                    },
                    { w: 50, h: 50 },
                    2,
                    "player",
                    false
                )
            )
        }
        const createObstacle = creationName => {
            //generateBirdY is possible to export
            const generateBirdY = () => {
                const randPositions = [0, 50, 100, 150, 200, 250, 280]
                const getPosition = Math.round(
                    Math.random() * randPositions.length - 1
                ) //generate random arr index
                const result = randPositions[Math.abs(getPosition)]
                if (typeof result === "number") {
                    return result
                }
                return generateBirdY()
            }

            const BoardElementSpeed = {
                tree: 2,
                bird: 3,
                birdZ: 4,
            }
            const BoardElementSize = {
                tree: 200,
                bird: 40,
            }
            const creationType =
                creationName === "birdz" ? "bird" : creationName

            return this.board.children.push(
                new BoardElement(
                    creationName,
                    "",
                    this.board.children.length,
                    creationType === "tree"
                        ? {
                              x: 700,
                              y: this.board.maxY - 200,
                          }
                        : {
                              x: 700,
                              y: generateBirdY(),
                          },
                    {
                        w: BoardElementSize[creationType],
                        h: BoardElementSize[creationType],
                    },
                    BoardElementSpeed[creationType],
                    creationType,
                    false
                )
            )
        }
        switch (type.toLowerCase()) {
            case "bird":
                createObstacle("bird")
                break
            case "birdz":
                createObstacle("birdz")
                break
            case "tree":
                createObstacle("tree")
                break
            case "player":
                createPlayer()
                break
            default:
                null
        }
    }

    render(el) {
        const assets = {
            birdz: "bird_eagle",
            bird: "bird_gull",
            tree: "tree3",
            player: "player_plane",
        }

        const parent = document.getElementById("elements")
        const child = document.createElement("div")
        child.setAttribute("id", `${el.name}${el.id}`)
        child.classList.add(`${el.name}`, `${el.type}`)
        child.style.left = el.position.x + "px"
        child.style.top = el.position.y + "px"
        child.style.width = el.size.w + "px"
        child.style.height = el.size.h + "px"
        child.style.backgroundRepeat = "round"
        child.style.backgroundImage = `url('img/${
            assets[el.name.toLowerCase()]
        }.png')`
        parent.appendChild(child)
        el.dom = document.getElementById(`${el.name}${el.id}`)
    }

    handleCollision() {
        const boardElements = this.board.children
        const player = this.board.children[0]
        for (let i = 1; i < boardElements.length; i++) {
            const currentX = boardElements[i].position.x
            const currentY = boardElements[i].position.y
            const currentSize = boardElements[i].size.w
            const dx = player.position.x - currentX
            const dy = player.position.y - currentY
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (
                boardElements[i].type !== "tree" &&
                distance < player.size.w / 2 + currentSize / 2
            ) {
                return this.stop()
            } else if (distance < player.size.w / 2) {
                return this.stop()
            }
        }
    }
    destroy(el) {
        const destroy = el => {
            if (el.destroyed) {
                return
            }
            el.destroyed = true
        }
        if (el.length) {
            return el.forEach(element => destroy(element))
        } else {
            destroy(el)
        }
        Object.freeze(el)
    }
    handleDestroy() {
        const boardElements = this.board.children
        for (let i = 1; i < boardElements.length; i++) {
            if (boardElements[i].position.x < 0 - boardElements[i].size.w) {
                this.destroy(boardElements[i])
            }
        }
    }
    boardBtns() {
        const hideBtns = () => {
            this.board.btns.forEach(e => (e.style.display = "none"))
        }
        const showBtns = () => {
            this.board.btns.forEach(e => (e.style.display = "block"))
        }
        const [backBtn, startBtn, helpBtn] = this.board.btns
        const removeEventListeners = () => {
            backBtn.removeEventListener("click", previousPage)
            startBtn.removeEventListener("click", startGame)
            helpBtn.removeEventListener("click", popHelpModal)
            this.activeListeners.forEach(el => removeEventListener("click", el))
        }
        const boardCleanUp = () => {
            hideBtns()
            removeEventListeners()
        }
        const previousPage = () => {
            console.log("prevPage")
            boardCleanUp()
        }
        const startGame = () => {
            backBtn.removeEventListener("click", startGame)
            this.start()
            boardCleanUp()
        }
        const popHelpModal = () => {
            this.popModal("instruction")
            boardCleanUp()
        }
        const setEventListeners = () => {
            backBtn.addEventListener("click", previousPage)
            startBtn.addEventListener("click", startGame)
            helpBtn.addEventListener("click", popHelpModal)
        }
        showBtns()
        removeEventListeners()
        setEventListeners()
        this.activeListeners.push(backBtn, startBtn, helpBtn)
    }
    reset() {
        document.getElementById("elements").innerHTML = ""
        this._score = 0
        this.boardBtns()
    }
    start() {
        this.create("player")
        const [player] = this.board.children
        this.render(player)
        document.addEventListener("keydown", player.keySupport)
        let prevUpdateTime = Date.now()
        const update = () => {
            const currentTime = Date.now()
            const timeDiff = currentTime - prevUpdateTime
            const boardElementsNumber = this.board.children.length
            const boardElementsCreation = () => {
                if (boardElementsNumber % 7 === 0) {
                    game.create("tree")
                    game.render(
                        this.board.children[this.board.children.length - 1]
                    )
                    game._score += 7
                } else if (boardElementsNumber % 13 === 0) {
                    game.create("birdz")
                    game.render(
                        this.board.children[this.board.children.length - 1]
                    )
                    game._score += 9
                } else {
                    game.create("bird")
                    game.render(
                        this.board.children[this.board.children.length - 1]
                    )
                    game._score += 4
                }
            }
            const elementsMove = () => {
                const boardElements = this.board.children
                for (let i = 1; i < boardElements.length; i++) {
                    boardElements[i].move("left")
                }
            }
            const difficulty = () => {
                const difficultyRates = [600, 400, 300, 200]
                if (boardElementsNumber > 50) {
                    return difficultyRates[3]
                }
                if (boardElementsNumber > 30) {
                    return difficultyRates[2]
                }
                if (boardElementsNumber > 15) {
                    return difficultyRates[1]
                }
                if (boardElementsNumber <= 15) {
                    return difficultyRates[0]
                }
            }
            if (boardElementsNumber !== 0 && timeDiff > difficulty()) {
                boardElementsCreation()
                prevUpdateTime = currentTime
            }
            this.handleCollision()
            elementsMove()
            this.handleDestroy()
            requestAnimationFrame(update)
        }
        update()
    }
    popModal(type) {
        //TODO: use cases:
        //show highscores
        const modals = {
            instruction: {
                id: "modalHelp",
                btns: [
                    {
                        dom: "iconHelpClose",
                        type: "close",
                    },
                    {
                        dom: "btnHelpClose",
                        type: "close",
                    },
                ],
            },
            gameOver: {
                id: "modalGameover",
                btns: [
                    {
                        type: "saveScore",
                        dom: "btnSaveScore",
                    },
                    {
                        type: "clearScores",
                        dom: "btnClearScores",
                    },
                    {
                        type: "displayScores",
                        dom: "btnDisplayScores",
                    },
                    {
                        type: "reset",
                        dom: "btnGameoverClose",
                    },
                ],
            },
            highScore: {
                id: "modalHighscore",
                btns: [],
            },
        }
        const activeModal = document.getElementById(modals[type].id)
        const activeBtnsCleanup = btnsArr => {
            btnsArr.forEach(() => removeEventListener("click", closeModal))
        }

        function closeModal() {
            activeModal.style.display = "none"
            activeModal.removeEventListener("click", closeModal)
            activeBtnsCleanup(game.activeListeners)
            game.activeListeners = []
        }
        const resetGame = () => {
            closeModal()
            this.reset()
        }

        const activeBtns = btnsArr => {
            btnsArr.forEach(el => {
                const currentElementDom = document.getElementById(el.dom)
                switch (el.type) {
                    case "close":
                        currentElementDom.addEventListener("click", closeModal)
                        break
                    case "reset":
                        currentElementDom.addEventListener("click", resetGame)
                }
                this.activeListeners.push(currentElementDom)
            })
        }
        activeModal.style.display = "flex"
        activeBtns(modals[type].btns)
    }

    stop() {
        const clearBoard = () => {
            this.board.children = []
        }
        clearBoard()
        Object.freeze(this.board.children[0])
        this.popModal("gameOver")
    }
}

const game = new Game()
game.boardBtns()
