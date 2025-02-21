import './index.css'
import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import logo from './images/logo.png'

// Fix: Get a random word from the object keys
function getWord() {
  const wordEntries = Object.entries(words) // Convert object to array of [word, hint] pairs
  const randomEntry = wordEntries[Math.floor(Math.random() * wordEntries.length)]
  return { word: randomEntry[0], hint: randomEntry[1] } // Return an object with word and hint
}

function App() {
  const [gameWord, setGameWord] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wordToGuess = gameWord.word
  const hint = gameWord.hint

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() // Ensure lowercase
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setGameWord(getWord()) // Reset game with a new word + hint
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <div className='container'
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      {/* 🔹 Logo */}
      <img className='logo'
        src={logo} 
        alt="Game Logo" 
        style={{ width: "200px", height: "auto", marginTop: 0 }} 
      />

      <h3 className='creds'>Made with ❤️ - <a href="https://github.com/AbhishekU007">Abhishek</a></h3>

      <div className='component' style={{ fontSize: "1.5rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        hint={hint}  // Fix: Pass hint correctly
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div className='component' style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
