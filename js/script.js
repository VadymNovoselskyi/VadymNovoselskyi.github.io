/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let presentComma = false;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et

        addDigit(digit);
    } else { // Inte en siffertangent, övriga tangenter.
        switch (btn) {
            case "add":
                setOperator(btn);
                memory = lcd.value;
                clearLCD();
                break;
            case "sub":
                setOperator(btn);
                memory = lcd.value;
                clearLCD();
                break;
            case "mul":
                setOperator(btn);
                memory = lcd.value;
                clearLCD();
                break;
            case "div":
                setOperator(btn);
                memory = lcd.value;
                clearLCD();
                break;
            case "comma":
                addComma();
                break;
            case "enter":
                calculate();
                break;
            case "clear":
                memClear();
                break            
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    presentComma = false;
    for (let i = 0; i < lcd.value.length; i++){
        if (lcd.value.substring(i, i + 1) == ',') {
            presentComma = true;
        }
    }  

    if (!presentComma && lcd.value.length != 0) {
        lcd.value += ',';
    }  
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    arithmetic = operator;
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    switch (arithmetic) {
        case "add":
            lcd.value = parseFloat(memory.replace(",", ".")) + parseFloat(lcd.value.replace(",", "."));
            break;
        case "sub":
            lcd.value = parseFloat(memory.replace(",", ".")) - parseFloat(lcd.value.replace(",", "."));
            break;
        case "mul":
            lcd.value = parseFloat(memory.replace(",", ".")) * parseFloat(lcd.value.replace(",", "."));
            break;
        case "div":
            lcd.value = parseFloat(memory.replace(",", ".")) / parseFloat(lcd.value.replace(",", "."));
            break;
    }
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
