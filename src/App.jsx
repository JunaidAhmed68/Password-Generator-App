import { useState, useCallback, useEffect, useRef } from 'react'
import Length from './components/Length slider.jsx'
import './App.css'

function App() {
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const passwordRef = useRef(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [copyBtnText, setCopyBtnText] = useState('Copy')

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
        .then(() => {
          setCopySuccess(true)
        })
        .catch(() => {
          alert('Failed to copy!')
        })
    }
  }, [password])

  const PassGenerator = useCallback(() => {
    let chars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

    if (includeUppercase) chars += upperCase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    let generated = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generated += chars[randomIndex]
    }

    setPassword(generated)
  }, [includeUppercase, includeNumbers, includeSymbols, length])

  useEffect(() => {
    PassGenerator()
  }, [PassGenerator])

  useEffect(() => {
    if (copySuccess) {
      setCopyBtnText('Copied!')
      const timer = setTimeout(() => {
        setCopyBtnText('Copy')
        setCopySuccess(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copySuccess])

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 min-h-screen p-8'>
        <h1 className='text-2xl font-bold'>Password Generator</h1>

        <div>
          <input
            className='border p-2 rounded text-white'
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className='border p-2 rounded bg-green-500 text-white hover:bg-green-600 ml-2'
            onClick={copyToClipboard}
          >
            {copyBtnText}
          </button>
        </div>

        <Length length={length} setLength={setLength} />

        <div className='flex flex-col gap-2 justify-center p-2 items-start'>
          <label>
            <input
              type='checkbox'
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />{' '}
            Include Uppercase Letters
          </label>

          <label>
            <input
              type='checkbox'
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />{' '}
            Include Numbers
          </label>

          <label>
            <input
              type='checkbox'
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />{' '}
            Include Symbols
          </label>
        </div>
      </div>
    </>
  )
}

export default App
