import React from "react"
import Die from "./Die.tsx"
import {nanoid} from "nanoid"

export default function App() {

  const [currentDice, setCurrentDice]: [currentDice: {id: String, dieValue: Number, selected: Boolean}[], setCurrentDice: any] = React.useState(randomizeAllDice());




  function randomizeAllDice(): {id: String, dieValue: Number, selected: Boolean}[] {
    /*
    Randomizes numOfDice amount of dice values (1-6), puts them into an object with the second value defaulting as false, 
    puts that object into an array, and returns that array.
    */
    const diceArr: {id: String, dieValue: Number, selected: Boolean}[] = [];
    const numOfDice: number = 10;

    for (let i = 0; i < numOfDice; i++) {
      const currentDieValue: number = Math.ceil(Math.random() * 6); // Math.random() * (max - min) + min;
      diceArr.push({id: nanoid(), dieValue: currentDieValue, selected: false});
    }

    return diceArr;
  }

  function rerollButton(): any {
    /*
      Used by the reroll button to reroll all the dice that are not selected.
    */
    for (let i = 0; i < currentDice.length; i++) {
      if (!currentDice[i].selected) {
        currentDice[i].id = nanoid();
        currentDice[i].dieValue = Math.ceil(Math.random() * 6);;
      }
    }
  }

  function selectDice(dieID) {
    /*
      Takes the die that was selected (clicked on) and sets its selected value to the opposite of what it was.
    */
    for (let i = 0; i < currentDice.length; i++) {
      if (currentDice[i].id === dieID) {
        currentDice[i].selected = !currentDice[i].selected;
        return;
      }
    }
  }




  return (
    <main>
      <div className="dice-container">
        {currentDice.map(die => <Die key={die.id} value={die} selectDice={() => selectDice(die.id)} />)}
      </div>

      <button id="newDiceButton" onClick={rerollButton}>Roll new dice</button>
      
    </main>
  );
}

