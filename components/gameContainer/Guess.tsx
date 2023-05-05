import { useEffect, useRef, useState } from "react";

interface Props {
  wordToGuess: string;
  guessedWord?: string;
  onChange: (guess: string[]) => void;
}

const isMatch = (a: string, b: string) => a?.toLowerCase() === b?.toLowerCase();

const Guess: React.FC<Props> = ({ wordToGuess, guessedWord, onChange }) => {
  const [guess, setGuess] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[focusedIndex].focus();
    inputRefs.current[focusedIndex].setSelectionRange(0, 1);
  }, [focusedIndex]);

  const updateGuess = (index: number, value: string) => {
    const newGuess = [...guess];
    newGuess[index] = value;

    if (inputRefs.current[index + 1]?.disabled) {
      newGuess[index + 1] = " ";
    }

    // console.log(`setting new value at pos ${index}: `, value);
    setGuess(newGuess);
    onChange(newGuess);
  };

  const goForward = () => {
    const steps = inputRefs.current[focusedIndex + 1]?.disabled ? 2 : 1;

    if (focusedIndex < wordToGuess.length - steps) {
      // console.log("going forward");
      setFocusedIndex(focusedIndex + steps);
    }
  };

  const goBack = () => {
    const steps = inputRefs.current[focusedIndex - 1]?.disabled ? 2 : 1;

    if (focusedIndex > 0) {
      // console.log("going back");
      setFocusedIndex(focusedIndex - steps);
    }
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    updateGuess(index, value);

    if (value) {
      goForward();
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 15 }}>
      {wordToGuess.split("").map((letter, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el!;
          }}
          type="text"
          value={guess[index] || ""}
          onChange={(event) => handleInputChange(index, event)}
          disabled={!!guessedWord || !letter?.trim()}
          maxLength={1}
          onFocus={() => setFocusedIndex(index)}
          onKeyUp={(event) => {
            if (event.key === "Backspace") {
              goBack();
            } else if (event.key === "ArrowLeft") {
              goBack();
            } else if (event.key === "ArrowRight") {
              goForward();
            }
          }}
          style={{
            width: 25,
            height: 25,
            margin: "0px auto 3px 0px",
            textAlign: "center",
            textTransform: "uppercase",
            border: "none",
            background: !letter?.trim()
              ? "gray"
              : guessedWord && isMatch(guessedWord[index], letter)
              ? "lightgreen"
              : "lightgray",
            borderRadius: 3
          }}
        />
      ))}
    </div>
  );
};

export default Guess;
