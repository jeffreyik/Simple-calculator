class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
            case '/':
                computation = prev / current;
            default:
                return
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = ''; 
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = `<h1>${this.getDisplayNumber(this.currentOperand)}</h1>`;
        if(this.operation != null) {
            this.previousOperandTextElement.innerHTML = `<h2>${this.getDisplayNumber(this.previousOperand)} ${this.operation}</h2>`;
        } else {
             this.previousOperandTextElement.innerHTML = ``;
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        calculator.appendNumber(button.value);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        calculator.chooseOperation(button.value);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    button.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    button.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    button.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
})