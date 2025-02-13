class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.clear();
    }

    clear() {
        this.currentInput = "";
        this.previousInput = "";
        this.operator = null;
        this.display();
    }

    inputNumber(num) {
        this.currentInput += num;
        this.display();
    }

    inputOp(op) {
        if (op === "CL") {
            this.clear();
            return;
        }
        if (op === "=") {
            this.calculate();
            return;
        }
        if (this.currentInput === "") return;

        if (this.previousInput !== "") {
            this.calculate();
        }

        this.operator = op;
        this.previousInput = this.currentInput;
        this.currentInput = "";
    }

    calculate() {
        if (this.previousInput === "" || this.currentInput === "") return;

        let num1 = parseFloat(this.previousInput);
        let num2 = parseFloat(this.currentInput);
        let result;

        switch (this.operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "x":
                result = num1 * num2;
                break;
            case "/":
                result = num2 !== 0 ? num1 / num2 : "Error";
                break;
            default:
                return;
        }

        this.currentInput = result.toString();
        this.previousInput = "";
        this.operator = null;
        this.display();
    }

    display() {
        this.displayElement.value = this.currentInput;
    }
}

// **Kod untuk menghubungkan JavaScript dengan HTML**
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("answerDisplay");
    const calculator = new Calculator(display);

    document.querySelectorAll(".button-container button").forEach(button => {
        button.addEventListener("click", (event) => {
            const char = event.target.innerText.trim();

            if (!isNaN(char)) {
                calculator.inputNumber(char);
            } else if (["+", "-", "x", "/"].includes(char)) {
                calculator.inputOp(char);
            } else if (char === "=") {
                calculator.calculate();
            } else if (char === "CL") {
                calculator.clear();
            }
        });
    });
});
