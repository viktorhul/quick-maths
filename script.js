const MAX_NUMBER = 5

const total = document.querySelector('#stat_total')
const correct = document.querySelector('#stat_correct')
const ratio = document.querySelector('#stat_ratio')
const question = document.querySelector('#question')
const input = document.querySelector('#input')
const saveBrain = document.querySelector('#save_brain_button')

const brain = (localStorage.getItem('brain')) ? localStorage.getItem('brain') : new Brain(MAX_NUMBER)
let CURRENT_EXPRESSION, CLOCK

input.onkeyup = (event) => (event.keyCode == 13) ? evaluate() : ''

function randomExpression(MAX_NUMBER) {
    let [left, right] = brain.generate()

    if (CURRENT_EXPRESSION) {
        while (CURRENT_EXPRESSION.left == left && CURRENT_EXPRESSION.right == right) {
            const arr = brain.generate()
            left = arr[0]
            right = arr[1]
        }
    }

    return new Addition(left, right)
}

function evaluate() {
    if (CURRENT_EXPRESSION) {
        if (input.value == '') return

        question.innerText = '...'

        const timeElapsed = new Date() - CLOCK
        const isCorrect = input.value == CURRENT_EXPRESSION.result()

        brain.learn(CURRENT_EXPRESSION, timeElapsed, isCorrect)

        input.value = ''
    }

    CURRENT_EXPRESSION = randomExpression(MAX_NUMBER)
    question.innerText = CURRENT_EXPRESSION
    CLOCK = new Date()
}

function storeBrain() {
    localStorage.setItem('brain', JSON.stringify(brain))
}

saveBrain.addEventListener('click', storeBrain)

function removeBrain() {
    localStorage.removeItem('brain')
}