const MAX_NUMBER = 5

const total = document.querySelector('#stat_total')
const correct = document.querySelector('#stat_correct')
const ratio = document.querySelector('#stat_ratio')
const question = document.querySelector('#question')
const input = document.querySelector('#input')

const brain = new Brain(MAX_NUMBER)
let CURRENT_EXPRESSION, CLOCK

input.onkeyup = (event) => (event.keyCode == 13) ? evaluate() : ''

function evaluate() {
    if (CURRENT_EXPRESSION) {
        if (input.value == '') return

        const timeElapsed = new Date() - CLOCK
        const isCorrect = input.value == CURRENT_EXPRESSION.result()

        brain.learn(CURRENT_EXPRESSION, timeElapsed, isCorrect)

        console.log(brain)

        input.value = ''
    }

    CURRENT_EXPRESSION = randomExpression(MAX_NUMBER)
    question.innerText = CURRENT_EXPRESSION
    CLOCK = new Date()
}