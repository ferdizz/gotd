import { useState } from "react";
import Guess from "./Guess";

interface Props {
  wordToGuess: string;
  onGuess: () => void;
}

type Guesses = {
  [x: number]: string;
};

const arrayToWord = (array: string[]) => {
  let word = "";
  array.forEach((letter) => {
    word = word + letter;
  });

  return word;
};

const GameContainer: React.FC<Props> = ({ wordToGuess, onGuess }) => {
  const [guessedRight, setGuessedRight] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [guessedWords, setGuessedWords] = useState<Guesses>({
    [0]: ""
  });

  const handleGuessChange = (guess: string[]) => {
    setCurrentGuess(guess);
  };

  const handleSubmit = () => {
    const guessedWord = arrayToWord(currentGuess);

    if (guessedWord === wordToGuess) {
      alert("Congrats!! You got it!");
      setGuessedRight(true);
      setGuessedWords({
        ...guessedWords,
        [attemptNumber]: guessedWord
      });
    } else {
      const newAttemptNumber = attemptNumber + 1;
      if (attemptNumber < 4) {
        setGuessedWords({
          ...guessedWords,
          [attemptNumber]: guessedWord,
          [newAttemptNumber]: ""
        });
        setAttemptNumber(newAttemptNumber);
        onGuess();
      } else {
        setGuessedWords({
          ...guessedWords,
          [attemptNumber]: guessedWord
        });
        setAttemptNumber(newAttemptNumber);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      {Object.keys(guessedWords).map((attempt, index) => (
        <Guess
          key={index}
          wordToGuess={wordToGuess}
          onChange={handleGuessChange}
          guessedWord={guessedWords[Number(attempt)]}
        />
      ))}
      {!guessedRight && attemptNumber <= 4 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default GameContainer;
