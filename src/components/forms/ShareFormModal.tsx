import { useState, useRef } from 'react'
import { Link2, Mail, ExternalLink, Trash2, SlidersHorizontal, QrCode, ChevronDown, Sparkles, Copy, Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { AutocompleteInput } from '../ui/AutocompleteInput'
import { BrandPreview } from './BrandPreview'
import { Button } from '../ui/Button'
import { Form } from '../../types'

interface ShareFormModalProps {
  form: Form | null
  onClose: () => void
}

type Tab = 'create' | 'existing'

const CURRENT_USER = 'Olha Pasternak'
const MOCK_AGENTS = [CURRENT_USER, 'Andrei Bas', 'John Smith', 'Sarah Johnson', 'Michael Davis', 'Emily Wilson']

const MOCK_SOURCES = [
  'Facebook Ads', 'Google Ads', 'Acme Insurance', 'State Farm Referral',
  'Allstate Partner', 'Website', 'Email Campaign', 'Progressive Partner',
  'LinkedIn', 'Trade Show 2026', 'Radio Campaign', 'Farmers Partner',
]

const MOCK_EXISTING_LINKS = [
  { id: '1', agent: 'None', referral: 'None', created: 'Apr 8, 2026', lastUsed: 'Never', primary: null, secondary: null },
  { id: '2', agent: 'Andrei Bas', referral: 'fff', created: 'Apr 8, 2026', lastUsed: 'Never', primary: '#AD0FA7', secondary: '#FFB800' },
  { id: '3', agent: 'John Smith', referral: 'Facebook Ads', created: 'Mar 15, 2026', lastUsed: 'Apr 10, 2026', primary: '#1A4012', secondary: '#D5B66C' },
]

// ── Color Field ──────────────────────────────────────────────
interface ColorFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
}

function ColorField({ label, value, onChange }: ColorFieldProps) {
  const nativeRef = useRef<HTMLInputElement>(null)
  const [localHex, setLocalHex] = useState(value.replace('#', ''))
  const prevValue = useRef(value)
  if (prevValue.current !== value) {
    prevValue.current = value
    setLocalHex(value.replace('#', ''))
  }

  function syncHex(raw: string) {
    setLocalHex(raw)
    if (/^#[0-9A-Fa-f]{6}$/.test('#' + raw)) onChange('#' + raw)
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#111827]">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => nativeRef.current?.click()}
          className="w-9 h-9 rounded-lg border-2 border-white shadow ring-1 ring-[#E5E7EB] flex-shrink-0 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          style={{ backgroundColor: value }}
          aria-label={`Pick ${label}`}
        />
        <input ref={nativeRef} type="color" value={value}
          onChange={e => onChange(e.target.value)} className="sr-only" tabIndex={-1} />
        <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden bg-white w-[96px]">
          <span className="pl-2.5 text-sm text-[#9CA3AF] select-none">#</span>
          <input
            type="text" value={localHex} onChange={e => syncHex(e.target.value)}
            maxLength={6}
            className="w-[62px] px-1 py-2 text-sm font-mono text-[#111827] focus:outline-none bg-transparent uppercase"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

// ── Color Swatch ─────────────────────────────────────────────
function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false)
  const [show, setShow] = useState(false)
  const hex = color.replace('#', '').toUpperCase()

  function copy(e: React.MouseEvent) {
    e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(color).catch(() => fallbackCopy(color))
    } else {
      fallbackCopy(color)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function fallbackCopy(text: string) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }

  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div
        className="w-5 h-5 rounded-md border border-white shadow-sm ring-1 ring-[#E5E7EB] cursor-default"
        style={{ backgroundColor: color }}
      />
      {/* transparent bridge fills the gap so mouse doesn't leave the zone */}
      <div className="absolute bottom-full left-0 right-0 h-2" />
      {show && (
        <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#111827] text-white text-xs rounded-lg px-2 py-1.5 whitespace-nowrap z-20 shadow-lg">
          <span className="font-mono">#{hex}</span>
          <button onClick={copy} className="text-[#9CA3AF] hover:text-white transition-colors ml-0.5">
            {copied ? <Check size={10} /> : <Copy size={10} />}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main Modal ───────────────────────────────────────────────
export function ShareFormModal({ form, onClose }: ShareFormModalProps) {
  const [tab, setTab] = useState<Tab>('create')
  const [agent, setAgent] = useState(CURRENT_USER)
  const [source, setSource] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#5A4FFF')
  const [secondaryColor, setSecondaryColor] = useState('#B88A1E')
  const [qrCode, setQrCode] = useState(false)
  const [brandingEnabled, setBrandingEnabled] = useState(false)
  const [linkSearch, setLinkSearch] = useState('')
  const [linkCreated, setLinkCreated] = useState(false)

  function resetCreateForm() {
    setAgent(CURRENT_USER)
    setSource('')
    setPartnerName('')
    setPrimaryColor('#5A4FFF')
    setSecondaryColor('#B88A1E')
    setQrCode(false)
    setBrandingEnabled(false)
    setLinkCreated(false)
  }

  if (!form) return null

  const showBrandingControls = brandingEnabled

  const filteredLinks = MOCK_EXISTING_LINKS.filter(l =>
    !linkSearch ||
    l.agent.toLowerCase().includes(linkSearch.toLowerCase()) ||
    l.referral.toLowerCase().includes(linkSearch.toLowerCase())
  )

  return (
    <Modal
      open={!!form}
      onClose={onClose}
      title="Share Form Link"
      subtitle={form.name}
      width="max-w-[640px]"
      footer={
        tab === 'create' && !linkCreated ? (
          <>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={() => setLinkCreated(true)}>Create Link</Button>
          </>
        ) : tab === 'create' && linkCreated ? (
          <>
            <Button variant="outline" onClick={() => { setTab('existing') }}>View All Links</Button>
            <Button variant="outline" onClick={resetCreateForm}>+ Create Another Link</Button>
            <Button variant="outline" onClick={onClose}>Done</Button>
          </>
        ) : (
          <Button variant="outline" onClick={onClose}>Done</Button>
        )
      }
    >
      {/* Tabs */}
      <div className="flex bg-[#F2F2F5] rounded-xl p-1 mb-6">
        <button
          onClick={() => setTab('create')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none
            ${tab === 'create' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
        >
          Create New Link
        </button>
        <button
          onClick={() => setTab('existing')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none flex items-center justify-center gap-2
            ${tab === 'existing' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
        >
          Existing Links
          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold
            ${tab === 'existing' ? 'bg-brand-purple text-white' : 'bg-[#E5E7EB] text-[#6B7280]'}`}>
            {MOCK_EXISTING_LINKS.length}
          </span>
        </button>
      </div>

      {/* ── CREATE TAB ─────────────────────────────────────── */}
      {tab === 'create' && linkCreated && (
        <div className="space-y-5 pb-2">
          {/* Generated link card — rainbow border */}
          <div className="rounded-xl p-3.5" style={{
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #10b981)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-sm flex-wrap">
                <span className="text-[#6B7280]">Agent: <strong className="text-[#111827]">{agent || 'None'}</strong></span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="text-[#6B7280]">Referral: <strong className="text-[#111827]">{source || 'None'}</strong></span>
                {partnerName && (
                  <>
                    <span className="text-[#D1D5DB]">•</span>
                    <span className="text-[#6B7280]">Partner: <strong className="text-[#111827]">{partnerName}</strong></span>
                  </>
                )}
                {showBrandingControls && (
                  <div className="flex items-center gap-1.5 ml-1">
                    <ColorSwatch color={primaryColor} />
                    <ColorSwatch color={secondaryColor} />
                  </div>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-[#E5E7EB] rounded-lg hover:border-[#C7C5FF] hover:text-brand-purple transition-colors flex-shrink-0">
                <Link2 size={13} />
                Copy Link
              </button>
            </div>
          </div>

          {/* Share via email */}
          <div>
            <p className="text-sm font-semibold text-[#111827] mb-0.5">Share Link with Agent or Referral Partner</p>
            <p className="text-sm text-[#6B7280] mb-3">Send an email with the link and instructions on how to use the link/forms</p>
            <div className="flex gap-2">
              <input
                type="email" placeholder="example@example.com"
                className="flex-1 px-3 py-2.5 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-brand-purple text-white rounded-lg hover:opacity-90 transition-opacity">
                <Mail size={14} />
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'create' && !linkCreated && (
        <div className="space-y-5 pb-2">

          {/* Agent Assignment */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-0.5">
              Agent Assignment
              <span className="ml-1.5 text-xs font-normal text-[#9CA3AF]">(Optional)</span>
            </label>
            <p className="text-sm text-[#6B7280] mb-2">
              Which agent would you like to be associated with this form group?
            </p>
            <div className="relative">
              <select
                value={agent}
                onChange={e => setAgent(e.target.value)}
                className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <option value="">Select agent</option>
                {MOCK_AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            </div>
          </div>

          {/* Referral Source */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-0.5">
              Referral Source
              <span className="ml-1.5 text-xs font-normal text-[#9CA3AF]">(Optional)</span>
            </label>
            <p className="text-sm text-[#6B7280] mb-2">
              If you'd like to associate this form to a referral source enter the source name
            </p>
            <AutocompleteInput
              value={source}
              onChange={setSource}
              options={MOCK_SOURCES}
              placeholder="Ex: Acme"
            />
          </div>

          {/* ── Partner Branding ── */}
          <div className={`rounded-xl border overflow-hidden transition-colors duration-200
            ${showBrandingControls ? 'border-[#C7C5FF]' : 'border-[#E5E7EB]'}`}>

            {/* Header — always visible */}
            <div className={`px-4 py-3 flex items-center gap-3 transition-colors duration-200
              ${showBrandingControls ? 'bg-[#F5F4FF] border-b border-[#C7C5FF]' : 'bg-[#F9FAFB]'}`}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ backgroundColor: showBrandingControls ? primaryColor : '#6B7280' }}
              >
                {showBrandingControls
                  ? <Sparkles size={13} className="text-white" />
                  : <Sparkles size={13} className="text-white" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold transition-colors duration-200
                  ${showBrandingControls ? 'text-brand-purple' : 'text-[#374151]'}`}>
                  Partner Branding
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  {showBrandingControls
                    ? partnerName ? `Customizing colors for "${partnerName}"` : 'Customize brand colors for this partner'
                    : 'Toggle on to set custom brand colors for this link'}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={brandingEnabled}
                onClick={() => setBrandingEnabled(v => !v)}
                className="relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-full"
              >
                <div className={`w-10 h-[22px] rounded-full border transition-colors duration-200
                  ${brandingEnabled ? 'bg-brand-purple border-brand-purple' : 'bg-[#E5E7EB] border-[#D1D5DB]'}`} />
                <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                  ${brandingEnabled ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
              </button>
            </div>

            {/* Body — branding off */}
            {!showBrandingControls && (
              <div className="px-4 py-3.5 flex items-center gap-2.5">
                <Sparkles size={14} className="text-[#D1D5DB] flex-shrink-0" />
                <p className="text-sm text-[#9CA3AF]">Enable to set a partner name and custom brand colors for this link.</p>
              </div>
            )}

            {/* Body — fully unlocked */}
            {showBrandingControls && (
              <div className="p-4 space-y-4">
                {/* Partner Name */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Partner Name
                    <span className="ml-1.5 text-xs font-normal text-[#9CA3AF]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    placeholder="Ex: Acme Insurance"
                    className="w-full px-3 py-2.5 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                  <p className="mt-1 text-xs text-[#9CA3AF]">Used to label this link and personalize the shared form experience.</p>
                </div>
                {/* Colors + Preview */}
                <div className="flex gap-5 items-start">
                  <div className="space-y-4" style={{ minWidth: 0, flex: '1 1 200px' }}>
                    <ColorField label="Primary Color" value={primaryColor} onChange={setPrimaryColor} />
                    <ColorField label="Secondary Color" value={secondaryColor} onChange={setSecondaryColor} />
                  </div>
                  <div style={{ width: 168, flexShrink: 0 }}>
                    <p className="text-[11px] font-medium text-[#9CA3AF] mb-2 text-center tracking-wider uppercase">Preview</p>
                    <BrandPreview primary={primaryColor} secondary={secondaryColor} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate QR Code */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex-shrink-0">
              <input type="checkbox" checked={qrCode} onChange={e => setQrCode(e.target.checked)} className="sr-only peer" />
              <div className="w-9 h-5 rounded-full border border-[#E5E7EB] bg-[#F2F2F5] peer-checked:bg-brand-purple peer-checked:border-brand-purple transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <div className="flex items-center gap-2">
              <QrCode size={15} className="text-[#6B7280]" />
              <span className="text-sm font-medium text-[#111827]">Generate QR Code</span>
            </div>
          </label>
        </div>
      )}

      {/* ── EXISTING LINKS TAB ──────────────────────────────── */}
      {tab === 'existing' && (
        <div className="space-y-4 pb-2">
          <p className="text-sm text-[#6B7280]">
            Send an email with the link & instructions on how to use the link/forms or copy the link
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text" placeholder="Search by agent or source..."
                value={linkSearch} onChange={e => setLinkSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <Button variant="outline" leftIcon={<SlidersHorizontal size={14} />} size="sm">Filter</Button>
          </div>

          <div className="space-y-2">
            {filteredLinks.length === 0 && (
              <p className="text-sm text-[#9CA3AF] text-center py-6">No links found.</p>
            )}
            {filteredLinks.map(link => (
              <div key={link.id} className="rounded-xl border border-[#E5E7EB] p-3.5 hover:border-[#C7C5FF] hover:bg-[#FAFAFE] transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm flex-wrap">
                    <span className="text-[#6B7280]">Agent: <strong className="text-[#111827]">{link.agent}</strong></span>
                    <span className="text-[#D1D5DB]">•</span>
                    <span className="text-[#6B7280]">Referral: <strong className="text-[#111827]">{link.referral}</strong></span>
                    {link.primary && link.secondary && (
                      <div className="flex items-center gap-1.5 ml-1">
                        <ColorSwatch color={link.primary} />
                        <ColorSwatch color={link.secondary} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-brand-purple hover:border-brand-purple transition-colors">
                      <ExternalLink size={13} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-brand-purple hover:border-brand-purple transition-colors">
                      <Mail size={13} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-brand-purple hover:border-brand-purple transition-colors">
                      <Link2 size={13} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span>Created: <span className="text-[#6B7280]">{link.created}</span></span>
                    <span>•</span>
                    <span>Last used: <span className="text-[#6B7280]">{link.lastUsed}</span></span>
                  </div>
                  <button className="text-xs text-[#D14343] hover:underline opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Trash2 size={11} />
                    Delete Link
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <Button variant="outline" size="sm" onClick={() => setTab('create')}>+ Create Another Link</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
