class Cell {
    constructor() {
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

    stats() {
        return [this.tries, this.correct]
    }
}

// Defined as a mapping with all possible expressions
class Brain {
    constructor(size) {
        this.cells = Array(size)
        for (let i = 0; i < size; i++) {
            this.cells[i] = new Array(size)
            for (let j = 0; j < size; j++) {
                this.cells[i][j] = new Cell()
            }
        }
    }

    learn(expression, time, isCorrect) {
        const aPos = expression.left - 1
        const bPos = expression.right - 1
        
        this.cells[aPos][bPos].learn(time, isCorrect)
    }
}