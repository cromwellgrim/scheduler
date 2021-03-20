import { useState } from 'react'

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory(prev => {
      if(replace) {
        prev.pop();
      }
      const currentHistory = [...prev, newMode];
      return currentHistory
    })
  }

  const back = () => {
    setHistory( prev => {
    if (prev.length > 1 ) {
      prev.pop();
      setMode(prev[prev.length - 1])
    } else {
      setMode(prev[0])
    }
  })
  }


  return { mode, transition, back };
}