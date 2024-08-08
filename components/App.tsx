import React from "react"
import Die from "./Die.tsx"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"

export default function App() {

  const [currentDice, setCurrentDice]: [currentDice: {id: String, dieValue: Number, selected: Boolean}[], setCurrentDice: any] = React.useState(randomizeAllDice());
  const [wonGame, setWonGame]: [wonGame: Boolean, setWonGame: any] = React.useState(false);
  var rollButtonText: String = wonGame ? "New Game" : "Reroll Dice";

  React.useEffect(() => {
    /*
      Check if the game has been beaten.  This depends on 2 conditions:
      - All die are the same value.
      - All die have been selected.
    */
    const firstDieVal: Number = currentDice[0].dieValue;
    const sameDieValues: Boolean = currentDice.every(die => die.dieValue === firstDieVal);
    const allSelected: Boolean = currentDice.every(die => die.selected);

    // If all dice are the same value and they're all selected, the player wins.
    if (sameDieValues && allSelected) {
      setWonGame(true);
    }
  }, [currentDice])




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
      Used by the reroll button to start a new game if the game is won or to reroll the unselected dice if the 
      game is still in play.
    */
    if (wonGame) {
      setCurrentDice(randomizeAllDice());
      setWonGame(false);
    }

    else {
      setCurrentDice(oldDice => oldDice.map(die => {
        if (!die.selected) {
          return {
            ...die,
            id: nanoid(),
            dieValue: Math.ceil(Math.random() * 6)
          }
        }
        return die;
      }))
    }
  }

  function selectDice(dieID) {
    /*
      Takes the die that was selected (clicked on) and sets its selected value to the opposite of what it was.
    */
    setCurrentDice(oldDice => oldDice.map(die => {
      if (die.id === dieID) {
        return {
          ...die,
          selected: !die.selected
        }
      }
      return die;
    }))
  }




  return (
    <main>
      <div className="dice-container">
        {currentDice.map(die => <Die key={die.id} value={die} selectDice={() => selectDice(die.id)} />)}
      </div>

      <button id="newDiceButton" onClick={rerollButton}>{rollButtonText}</button>

      {wonGame && <Confetti />}
      
    </main>
  );
}

