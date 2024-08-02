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

  function rerollButton(): void {
    /*
    Used by the reroll button to reroll all the dice.  This will eventually not reroll user-selected dice.
    */
    setCurrentDice(randomizeAllDice());
  }




  return (
    <main>
      <div className="dice-container">
        {currentDice.map(die => <Die key={die.id} value={die} />)}
      </div>

      <button id="newDiceButton" onClick={rerollButton}>Roll new dice</button>
      
    </main>
  );
}

