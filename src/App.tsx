import { useState, useEffect } from 'react';
import './App.css'
import {HangImage} from './components/HangImage'

import { letters } from './helpers/letters';
import { getWord } from './helpers/getWord';


function App() {
  const [word, setWord] = useState( getWord );
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts,setAttempts ] = useState(0);
  const [lose, setLose] = useState( false );
  const [won, setWon] = useState( false );

 // Determinar si la persona perdio
  useEffect( () => {
    if(attempts >= 9){
      setLose(true)
    }
  }, [attempts])

  // Determinar si la persona gano
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('')
    if(currentHiddenWord === word){
      setWon(true);

    }
  }, [hiddenWord])

  const checkLetter = (letters: string) => {
      if( lose ) return;
      if( won ) return;

    if(!word.includes(letters)){
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }
    const hiddenWordArray = hiddenWord.split(' ');

    for(let i = 0; i < word.length; i++){
      if(word[i] === letters){
      hiddenWordArray[i] = letters;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getWord();

    setWord( newWord)
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className='App'>
      {/* imagenes */}
      <HangImage imageNumber={attempts}/>

      {/* Palabra oculpta */}
      <h3>{hiddenWord}</h3>

        {/*  numero de intentos*/}
      <h3>Intentos: {attempts} </h3>

      {
        (lose) 
        ? <h2>Perdio {word} </h2>
        : ''
      }

        {
        (won) 
        ? <h2>Felicidades, usted gano </h2>
        : ''
      }

      {/* botones de letras */}
      {letters.map((letter) => (
        <button onClick={() =>checkLetter(letter)} key={letter}>{letter}</button>
      ))}

        <br/> <br/>
        <button onClick={ newGame }>Nuevo Juego</button>

    </div>
    
  )

  
}

export default App
