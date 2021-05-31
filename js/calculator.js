(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
    }
  
    const displayInstaller = document.querySelector('#install_button');
    let deferredPrompt;
  
    displayInstaller.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      displayInstaller.style.display = 'block';
      displayInstaller.addEventListener('click', (e) => {
        displayInstaller.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => deferredPrompt = null);
      });
    });

const input_element = document.querySelectorAll('.input');

const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(";

let data = {
    operation : [],
    formula : []
}

let ans = 0;

// CALCULATOR BUTTONS
let calculator_buttons = [
    {
        name : "prad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "pdeg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "lrad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "ldeg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "DEL",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },
    {
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },
    {
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },
    {
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },
    {
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "seven",
        symbol : 7,
        formula : 7,
        type : "number"
    },
    {
        name : "eight",
        symbol : 8,
        formula : 8,
        type : "number"
    },
    {
        name : "nine",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "four",
        symbol : 4,
        formula : 4,
        type : "number"
    },
    {
        name : "five",
        symbol : 5,
        formula : 5,
        type : "number"
    },
    {
        name : "six",
        symbol : 6,
        formula : 6,
        type : "number"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "one",
        symbol : 1,
        formula : 1,
        type : "number"
    },
    {
        name : "two",
        symbol : 2,
        formula : 2,
        type : "number"
    },
    {
        name : "three",
        symbol : 3,
        formula : 3,
        type : "number"
    },
    {
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },
    {
        name : "point",
        symbol : ".",
        formula : ".",
        type : "number"
    },
    {
        name : "zero",
        symbol : 0,
        formula : 0,
        type : "number"
    },
    {
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },
    {
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

let RADIAN = true;

const p_rad_btn = document.getElementById('prad');
const p_deg_btn = document.getElementById('pdeg');
const l_rad_btn = document.getElementById('lrad');
const l_deg_btn = document.getElementById('ldeg');

p_rad_btn.classList.add("active");
l_rad_btn.classList.add("active");

function angleToggler(){
    p_rad_btn.classList.toggle("active");
    p_deg_btn.classList.toggle("active");
    l_rad_btn.classList.toggle("active");
    l_deg_btn.classList.toggle("active");
}

// click event listener
input_element.forEach(input => {
    input.addEventListener('click', event => {
        const target_btn = event.target;
    
        calculator_buttons.forEach( button => {
            if (button.name == target_btn.id) calculator(button);
        })
    })
})

// calculator function
function calculator(button) {
    console.log(button);
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    } else if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    } else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);

    }  else if (button.type == "math_function") {
        let symbol, formula;

        if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);

        } else {
            symbol = button.symbol + "(";
            formula = button.formula + "(";

            data.operation.push(symbol);
            data.formula.push(formula);
        }

    } else if (button.type == "key") {
        if (button.name == "clear"){
            data.operation = [];
            data.formula = [];

            updateOutputResult(0);

        } else if (button.name == "delete") {
            data.operation.pop();
            data.formula.pop();
            
        } else if (button.name == "prad" || button.name == "lrad") {
            RADIAN = true;
            angleToggler();
            
        } else if (button.name == "pdeg" || button.name == "ldeg") {
            RADIAN = false;
            angleToggler();
            
        }

    } else if (button.type == "calculate") {
        formula_str = data.formula.join('');

        // fix power
        // search for power function
        let POWER_SEARCH_RESULT = search(data.formula, POWER);
        console.log(data.formula, POWER_SEARCH_RESULT);
        // get power base
        const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
        console.log(BASES);

        BASES.forEach(base => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formula_str = formula_str.replace(toReplace, replacement);
        })

        let result = eval(formula_str);

        ans = result;
        data.operation = [ result ];
        data.formula = [ result ];

        updateOutputResult(result);
        return;
    }

    updateOutputOperation(data.operation.join(''));
}

// Search array
function search(array, keyword) {
    let search_result = [];

    array.forEach ((element, index) => {
        if (element  == keyword) search_result.push(index);
    })

    return search_result;
}
// power base getter
function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
    let powers_bases = []; // saves all bases in array

    POWER_SEARCH_RESULT.forEach(power_index => {
        let base = []; // current base

        let parentheses_count = 0;

        let previous_index = power_index - 1;

        while (previous_index >= 0) {

            let is_operator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[previous_index] == OPERATOR) is_operator = true;
            })

            let is_power = formula[previous_index] == POWER;

            if ((is_operator && parentheses_count == 0) || is_power) break;

            base.unshift (formula[previous_index]);
            previous_index--;
        }

        powers_bases.push(base.join(''))
    })

    return powers_bases;
}

// update output
function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation;
}
function updateOutputResult(result) {
    output_result_element.innerHTML = result;
}

function trigo(callback, angle){
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle);
}
function inv_trigo(callback, value){
    let angle = callback(value);

    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;
}
})
();