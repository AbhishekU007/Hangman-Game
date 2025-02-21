type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    hint: string
    reveal?: boolean
  }
  
  export function HangmanWord({
    guessedLetters,
    hint,
    wordToGuess,
    reveal = false,
  }: HangmanWordProps) {
    return (
      <div style={{ textAlign: "center" }}>
        {/* Word display logic */}
        <div
          style={{
            display: "flex",
            gap: ".25em",
            fontSize: "3rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace",
            justifyContent: "center",
          }}
        >
          {wordToGuess.split("").map((letter, index) => (
            <span style={{ borderBottom: ".1em solid black" }} key={index}>
              <span
                style={{
                  visibility:
                    guessedLetters.includes(letter) || reveal
                      ? "visible"
                      : "hidden",
                  color:
                    !guessedLetters.includes(letter) && reveal ? "red" : "black",
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>
  
        {/* Hint display */}
        <p
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            marginTop: "10px",
            color: "gray",
          }}
        >
          hint: {hint}
        </p>
      </div>
    )
  }
  