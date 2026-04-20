import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Search, Plus } from 'lucide-react'

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  label?: string
}

export function AutocompleteInput({ value, onChange, options, placeholder = 'Search or create...', label }: AutocompleteInputProps) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = value.trim()
    ? options.filter(o => o.toLowerCase().includes(value.toLowerCase()))
    : options

  const showCreate = value.trim() && !options.some(o => o.toLowerCase() === value.toLowerCase())

  const items = showCreate
    ? [...filtered, `__create__:${value.trim()}`]
    : filtered

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function select(item: string) {
    if (item.startsWith('__create__:')) {
      onChange(item.slice(11))
    } else {
      onChange(item)
    }
    setOpen(false)
    setCursor(-1)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) { if (e.key === 'ArrowDown') { setOpen(true); setCursor(0) }; return }
    if (e.key === 'ArrowDown') { setCursor(c => Math.min(c + 1, items.length - 1)) }
    else if (e.key === 'ArrowUp') { setCursor(c => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter' && cursor >= 0) { e.preventDefault(); select(items[cursor]) }
    else if (e.key === 'Escape') { setOpen(false); setCursor(-1) }
  }

  return (
    <div ref={containerRef} className="relative">
      {label && <label className="block text-sm font-medium text-[#111827] mb-1.5">{label}</label>}
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-[#9CA3AF] pointer-events-none" size={14} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={e => { onChange(e.target.value); setOpen(true); setCursor(-1) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E5E7EB] rounded-lg bg-white placeholder-[#9CA3AF] text-[#111827] focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          autoComplete="off"
        />
      </div>

      {open && items.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white border border-[#E5E7EB] rounded-xl shadow-lg py-1.5 max-h-48 overflow-y-auto"
        >
          {items.map((item, i) => {
            const isCreate = item.startsWith('__create__:')
            const label = isCreate ? item.slice(11) : item
            return (
              <li
                key={item}
                role="option"
                aria-selected={cursor === i}
                onMouseDown={() => select(item)}
                onMouseEnter={() => setCursor(i)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors
                  ${cursor === i ? 'bg-[#F5F4FF] text-brand-purple' : 'text-[#111827] hover:bg-[#F5F4FF]'}`}
              >
                {isCreate
                  ? <><Plus size={13} className="text-brand-purple flex-shrink-0" /><span>Create <strong>"{label}"</strong></span></>
                  : <span>{label}</span>
                }
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
