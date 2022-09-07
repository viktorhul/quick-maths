const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const size = (innerWidth > innerHeight) ? innerHeight - 50 : innerWidth - 50

const brain = new Brain(JSON.parse(localStorage.getItem('brain')).cells)
canvas.width = size
canvas.height = size

ctx.fillStyle = 'blue'
ctx.fillRect(0, 0, size, size)

const cellSize = size / brain.size



//let cells = [...brain.cells].sort((a,b) => console.log(a))//(a.median() > b.median()) ? -1 : 1)
//cells = cells.map(c => c.median())
//console.log(cells)
//brain.cells.sort((a,b) => (a.median() > b.median()) ? -1 : 1)

let medians = []

brain.cells.forEach(row => {
    row.forEach(cell => {
        cell.median()
        //console.log(cell.stats())
        //medians.push(cell.median())
        //ctx.fillStyle = 'white'
        //ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize)
    })
})

//console.log(medians)