class Expression {
    constructor(left, right, operator) {
        this.left = Number.parseInt(left)
        this.right = Number.parseInt(right)
        this.operator = operator
    }

    toString() {
        return this.left + ' ' + this.operator + ' ' + this.right
    }
}

class Addition extends Expression {
    constructor(left, right) {
        super(left, right, '+')
    }

    result() {
        return this.left + this.right
    }
}

// Not yet implemented
class Subtraction extends Expression {
    constructor(left, right) {
        super(left, right, '-')
    }

    result() {
        return this.left - this.right
    }
}