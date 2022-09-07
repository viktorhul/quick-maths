class Cell {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.times = []
        this.tries = 0
        this.correct = 0
    }

    // Adds new time to array
    learn(time, isCorrect) {
        this.times.push(time)
        this.tries++
        if (isCorrect) this.correct++
    } 

    // Returns average time
    average() {
        return this.times.reduce((a, b) => a + b, 0) / this.times.length
    }
    
    median() {
        const sorted = [...this.times].sort((a, b) => (a > b) ? 1 : -1)
        const isEven = (this.tries % 2 == 0)
        
        if (isEven) {
            return (sorted[this.tries / 2 - 1] + sorted[this.tries / 2]) / 2
        } else {
            return sorted[Math.floor(this.tries / 2)]
        }
    }

    stats() {
        return [this.tries, this.correct]
    }
}

// Defined as a mapping with all possible expressions
class Brain {
    constructor(size, cells = null) {
        this.size = size

        if (cells) {
            this.cells = cells
        } else {
            this.cells = Array(size)
            for (let i = 0; i < size; i++) {
                this.cells[i] = new Array(size)
                for (let j = 0; j < size; j++) {
                    this.cells[i][j] = new Cell(i, j)
                }
            }
        }
    }

    learn(expression, time, isCorrect) {
        const aPos = expression.left - 1
        const bPos = expression.right - 1
        
        this.cells[aPos][bPos].learn(time, isCorrect)
    }

    worstAdjacent(cell) {
        let returnCell = cell

        for (let a = cell.x - 1; a < cell.x + 1; a++) {
            for (let b = cell.y - 1; b < cell.y + 1; b++) {
                if (a < 0 || b < 0 || a >= this.size || b >= this.size) continue

                const checkCell = this.cells[a][b]

                const m1 = checkCell.median()
                const m2 = cell.median()

                if (!m1 || !m2) return checkCell

                if (checkCell.median() < cell.median()) {
                    returnCell = checkCell
                }
            }
        }
        
        return returnCell
    }

    generate() {
        const x = Math.ceil(Math.random() * this.size)
        const y = Math.ceil(Math.random() * this.size)

        let prev
        let next = this.cells[x - 1][y - 1]

        if (isNaN(next.median())) return [next.x + 1, next.y + 1]

        do {
            prev = next
            next = this.worstAdjacent(prev)
        } while (prev != next)
        
        return [next.x + 1, next.y + 1]
    }
}