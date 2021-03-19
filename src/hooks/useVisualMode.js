import { useState } from 'react'

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if(replace) {
      setHistory(prev => (prev.pop()))
    } 
    setHistory(prev => [...prev, newMode])
  }

  const back = () => {
    if (history.length > 2 ) {
      history.pop();
      setMode(history.slice(-1)[0])
    } else {
      setMode(history[0])
    }
  }


  return { mode, transition, back };
}