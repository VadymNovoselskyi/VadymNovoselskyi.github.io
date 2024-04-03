/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let presentComma; //V visar om det finns en komma på displayen

function init() {
  lcd = document.getElementById("lcd");
  let keyBoard = document.getElementById("keyBoard");
  keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
  let btn = e.target.id; //id för den tangent som tryckte ner

  // kollar om siffertangent är nedtryckt
  if (btn.substring(0, 1) === "b") {
    let digit = btn.substring(1, 2); //plockar ut siffran från id:et

    addDigit(digit); //V lägger till sifran på lcd
  } 
  else {
    // Inte en siffertangent, övriga tangenter.
    switch (btn) {
      case "comma": //V om användare trycker på comma tangenten
        addComma(); //V lägger till en komma
        break;
      case "enter": //V om användare trycker på enter tangenten
        calculateFinal(); //V kalkylerar slutlig resultat och lägger det på lcd
        memClear(); //V rensar miniräknarens memory
        break;
      case "clear": //V om användare trycker på clear tangenten
        memClear(); //V rensar miniräknarens memory
        clearLCD(); //V rensar data på lcd
        break;
      default: //V om användare trycker på något operator tangent ( +,-, x eller / )
        if (arithmetic == null) { //V om det är första inmatningen (första inmatningar efter clearLCD räknas också)
          setOperator(btn); //sparar operatorn
          calcMem(); //V kalkylerar  och sparar i 'memory' resultaten av nuvarande och föregående inmatning 
          clearLCD(); //V rensar data på lcd
        }
        else {
          calcMem(); //V kalkylerar  och sparar i 'memory' resultaten av nuvarande och föregående inmatning 
          setOperator(btn); //sparar operatorn
          clearLCD(); //V rensar data på lcd
        }
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
  presentComma = false; //V vi antar att det finns inte en kommarecken
  for (let i = 0; i < lcd.value.length; i++) {
    //V går genom alla tecken på lcd för att kolla om det finns en kommatecken
    if (lcd.value.substring(i, i + 1) == ",") {
      //V letar efter en kommatecken
      presentComma = true; //V om en kommatecken upptäcks, då sparas den
      break;
    }
  }

  if (!presentComma && lcd.value.length != 0) { //V om det finns ingen kommatecken på lcd samt att det finns inmattade tal
    lcd.value += ","; //V lägger till en kommatecken på lcd
  }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
  arithmetic = operator;
}

//V kalkylerar och sparar i 'memory' resultaten av nuvarande och föregående inmatning (0 - om det är första inmatning)
function calcMem() { //V används så att man ska kunna utgöra flera operatoiner i rad utan att klicka 'enter'
  switch (arithmetic) {
    case "add": //V om man klickar på '+' tangenten 
      if (lcd.value != "") { //V om lcd är inte tom (det görs så att om man trycker på flera operatorer utan att mätta in något tal, så ska det inte triggera calcMem vilket skulle ge NaN i resultat)
        memory =
          //V omvandlar 'memory' till float
                    //V omvandlar 'memory' till string, behövs så att man ska kunna använda .replace
                                    //V omvandlar kommatecken till en punkt, så att parseFloat ska kunna omvandla 'memory' till float
          parseFloat(String(memory).replace(",", ".")) + 
          parseFloat(lcd.value.replace(",", "."));
        }
        break;

    case "sub": //V om man klickade på - tangent
      if (memory == 0) { //V om memory är 0, förekommer oftast efter första imatningen
        memory = lcd.value; //V utan det skulle memory vara lika med lcd.value * (-1)
      } 
      else if (lcd.value != "") { //V om lcd är inte tom
        memory = parseFloat(String(memory).replace(",", ".")) - parseFloat(lcd.value.replace(",", "."));
      }
      break;

    case "mul": //V om man klickade på * tangent
      if (memory == 0) { //V om memory är 0
        memory = lcd.value; //V utan det skulle memory vara lika med 0
      } 
      else if (lcd.value != "") { //V om lcd är inte tom
        memory = parseFloat(String(memory).replace(",", ".")) * parseFloat(lcd.value.replace(",", "."));
      }
      break;

    case "div": //V om man klickade på / tangent
      if (memory == 0) { //V om memory är 0
        memory = lcd.value; //V utan det skulle memory vara lika med 0
      } 
      else if (lcd.value != "") { //V om lcd är inte tom
        memory = parseFloat(String(memory).replace(",", ".")) / parseFloat(lcd.value.replace(",", "."));
      }
      break;
  }
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculateFinal() {
  switch (arithmetic) {
    case "add": //V om man klickade på + tangent
      lcd.value = parseFloat(String(memory).replace(",", ".")) + parseFloat(lcd.value.replace(",", "."));
      break;

    case "sub": //V om man klickade på - tangent
      lcd.value = parseFloat(String(memory).replace(",", ".")) - parseFloat(lcd.value.replace(",", "."));
      break;

    case "mul": //V om man klickade på * tangent
      lcd.value = parseFloat(String(memory).replace(",", ".")) * parseFloat(lcd.value.replace(",", "."));
      break;

    case "div": //V om man klickade på / tangent
      lcd.value = parseFloat(String(memory).replace(",", ".")) / parseFloat(lcd.value.replace(",", "."));
      break;
  }
}

/** Rensar display */
function clearLCD() {
  lcd.value = "";
}

/** Rensar allt, reset */
function memClear() {
  memory = 0;
  arithmetic = null;
}

window.onload = init; //V kallar på funktionen init när sidan har laddats 