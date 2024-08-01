import React from "react"
import Die from "./Die.tsx"

export default function App() {

  const [currentDice, setCurrentDice]: [currentDice: number[], setCurrentDice: any] = React.useState(randomizeAllDice());




  function randomizeAllDice(): number[] {
    /*
    Randomizes numOfDice amount of dice values (1-6), puts them into an array, and returns that array.
    */
    const diceArr: number[] = [];
    const numOfDice: number = 10;
    for (let i = 0; i < numOfDice; i++) {
      const currentDieValue: number = Math.ceil(Math.random() * 6); // Math.random() * (max - min) + min;
      diceArr.push(currentDieValue);
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
        {currentDice.map(die => <Die value={die} />)}
      </div>

      <button id="newDiceButton" onClick={rerollButton}>Roll new dice</button>
      
    </main>
  );
}

