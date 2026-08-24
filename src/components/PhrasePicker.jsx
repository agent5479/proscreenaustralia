import { useEffect, useState } from 'react'

/**
 * Director phrasing selector: click one of three options; others hide.
 * "Change" restores all options so a different pick can be made.
 */
export default function PhrasePicker({ id, label, options }) {
  const storageKey = `commercials-phrase:${id}`
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved !== null && options[Number(saved)]) {
        setSelected(Number(saved))
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, options])

  const pick = (index) => {
    setSelected(index)
    try {
      localStorage.setItem(storageKey, String(index))
    } catch {
      /* ignore */
    }
  }

  const reset = () => {
    setSelected(null)
    try {
      localStorage.removeItem(storageKey)
    } catch {
      /* ignore */
    }
  }

  const locked = selected !== null

  return (
    <div className={`phrase-picker${locked ? ' is-locked' : ''}`}>
      <div className="phrase-picker-head">
        <h3 className="phrase-picker-label">{label}</h3>
        {locked ? (
          <button type="button" className="phrase-change-btn" onClick={reset}>
            Change
          </button>
        ) : (
          <span className="phrase-hint">Pick 1 of 3</span>
        )}
      </div>
      <div className="phrase-options">
        {options.map((text, index) => {
          if (locked && index !== selected) return null
          return (
            <button
              key={`${id}-${index}`}
              type="button"
              className={`phrase-option${locked && index === selected ? ' is-selected' : ''}`}
              onClick={() => (locked ? undefined : pick(index))}
              disabled={locked}
            >
              {!locked && <span className="phrase-letter">{String.fromCharCode(65 + index)}</span>}
              <span className="phrase-text">{text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
