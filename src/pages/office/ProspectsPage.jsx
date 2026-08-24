import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'idm-prospects-v1'

const CAMPAIGNS = [
  { id: 'farmer', label: 'Farmer' },
  { id: 'civil', label: 'Civil' },
  { id: 'landscaper', label: 'Landscaper' },
]

const TIERS = [
  { id: 'tier1', label: 'Tier 1 — Civil / infrastructure' },
  { id: 'tier2', label: 'Tier 2 — Commercial / subdivision' },
  { id: 'tier3', label: 'Tier 3 — Local trade' },
]

const REGIONS = [
  'Australia-wide',
  'QLD',
  'NSW',
  'VIC',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
]

const EMPTY_FORM = {
  id: '',
  tradingName: '',
  region: '',
  phone: '',
  email: '',
  website: '',
  campaign: 'farmer',
  tier: 'tier2',
  source: '',
  lastContacted: '',
  notes: '',
}

const CSV_HEADERS = [
  'tradingName',
  'region',
  'phone',
  'email',
  'website',
  'campaign',
  'tier',
  'source',
  'lastContacted',
  'notes',
]

function campaignLabel(id) {
  return CAMPAIGNS.find((c) => c.id === id)?.label || id
}

function tierLabel(id) {
  return TIERS.find((t) => t.id === id)?.label || id
}

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false
  const pushRow = () => {
    if (row.some((x) => String(x).trim())) rows.push(row)
    row = []
  }
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        cell += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(cell)
      cell = ''
    } else if (c === '\n') {
      row.push(cell)
      cell = ''
      pushRow()
    } else if (c === '\r') {
      continue
    } else {
      cell += c
    }
  }
  if (cell.length || row.length) {
    row.push(cell)
    pushRow()
  }
  return rows
}

function escapeCsv(value) {
  const s = value == null ? '' : String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function loadProspects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState(loadProspects)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filterCampaign, setFilterCampaign] = useState('')
  const [filterTier, setFilterTier] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects))
  }, [prospects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prospects.filter((p) => {
      if (filterCampaign && p.campaign !== filterCampaign) return false
      if (filterTier && p.tier !== filterTier) return false
      if (filterRegion && p.region !== filterRegion) return false
      if (!q) return true
      const blob = [p.tradingName, p.region, p.phone, p.email, p.website, p.source, p.notes]
        .join(' ')
        .toLowerCase()
      return blob.includes(q)
    })
  }, [prospects, filterCampaign, filterTier, filterRegion, query])

  function field(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function saveProspect(event) {
    event.preventDefault()
    if (!form.tradingName.trim()) {
      setStatus('Trading name is required.')
      return
    }
    const record = { ...form, tradingName: form.tradingName.trim() }
    if (record.id) {
      setProspects((list) => list.map((p) => (p.id === record.id ? record : p)))
      setStatus('Updated.')
    } else {
      record.id = newId()
      setProspects((list) => [record, ...list])
      setStatus('Added.')
    }
    setForm(EMPTY_FORM)
  }

  function editRow(row) {
    setForm({ ...EMPTY_FORM, ...row })
    setStatus(`Editing ${row.tradingName}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteRow(id) {
    const row = prospects.find((p) => p.id === id)
    if (!row) return
    if (!window.confirm(`Remove ${row.tradingName} from this machine’s list?`)) return
    setProspects((list) => list.filter((p) => p.id !== id))
    if (form.id === id) setForm(EMPTY_FORM)
    setStatus('Removed.')
  }

  function exportCsv() {
    const lines = [CSV_HEADERS.join(',')]
    filtered.forEach((p) => {
      lines.push(CSV_HEADERS.map((h) => escapeCsv(p[h])).join(','))
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-machinery-prospects.csv'
    a.click()
    URL.revokeObjectURL(url)
    setStatus(`Exported ${filtered.length} row${filtered.length === 1 ? '' : 's'}.`)
  }

  function downloadTemplate() {
    const blob = new Blob([`${CSV_HEADERS.join(',')}\n`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-machinery-prospects-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importCsv(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const rows = parseCsv(String(reader.result || ''))
      if (!rows.length) {
        setStatus('CSV was empty.')
        return
      }
      const header = rows[0].map((h) => String(h).trim())
      const idx = Object.fromEntries(CSV_HEADERS.map((h) => [h, header.indexOf(h)]))
      const missing = CSV_HEADERS.filter((h) => idx[h] < 0)
      if (missing.length) {
        setStatus(`CSV needs columns: ${CSV_HEADERS.join(', ')}`)
        return
      }
      const next = rows.slice(1).map((cells) => {
        const rec = { id: newId() }
        CSV_HEADERS.forEach((h) => {
          rec[h] = (cells[idx[h]] || '').trim()
        })
        if (!CAMPAIGNS.some((c) => c.id === rec.campaign)) rec.campaign = 'landscaper'
        if (!TIERS.some((t) => t.id === rec.tier)) rec.tier = 'tier3'
        return rec
      }).filter((r) => r.tradingName)
      setProspects((list) => [...next, ...list])
      setStatus(`Imported ${next.length} row${next.length === 1 ? '' : 's'}.`)
    }
    reader.readAsText(file)
  }

  return (
    <section className="page-content commercials-page commercials-compact prospects-page">
      <div className="commercials-banner commercials-banner-compact prospects-no-print">
        <div className="commercials-banner-row">
          <Link to="/idm/commercials" className="commercials-kicker-inline">
            ← Hub
          </Link>
          <span className="commercials-badge">Office · Prospects</span>
        </div>
        <h1>Prospect list</h1>
        <p className="commercials-sub">
          Farmer, civil and landscaper contacts stay on this browser until you export a CSV. This
          page does not scrape directories or send email.
        </p>
      </div>

      <div className="prospects-help prospects-no-print">
        <h2>How to build the list</h2>
        <p>
          The workspace is automated. Harvesting directories is not. Search official sources,
          paste rows here, then phone or post. Unsolicited commercial email to harvested addresses
          is the high-risk path under the Unsolicited Electronic Messages Act 2007.
        </p>
        <ul>
          <li>
            <a href="https://www.nzbn.govt.nz/" target="_blank" rel="noreferrer">
              NZBN search
            </a>{' '}
            — registered businesses. Copy name and status; do not bulk-query from this site.
          </li>
          <li>
            <a href="https://app.companiesoffice.govt.nz/" target="_blank" rel="noreferrer">
              Companies Office
            </a>{' '}
            — confirm the company is still registered.
          </li>
          <li>
            Manual directories: Registered Master Landscapers,{' '}
            <a href="https://archipro.co.nz/" target="_blank" rel="noreferrer">
              ArchiPro
            </a>
            ,{' '}
            <a href="https://www.gets.govt.nz/" target="_blank" rel="noreferrer">
              GETS
            </a>{' '}
            award notices, Federated Farmers or civil contacts you already have. Visit and copy —
            do not scrape.
          </li>
          <li>
            Tag enterprise scale yourself: Tier 1 civil/infrastructure, Tier 2
            commercial/subdivision, Tier 3 local trade.
          </li>
          <li>Campaign pages to share when you call: <Link to="/for/farmers">Farmers</Link> · <Link to="/for/civil-contractors">Civil contractors</Link>.</li>
        </ul>
      </div>

      <form className="prospects-form prospects-no-print" onSubmit={saveProspect}>
        <h2>{form.id ? 'Edit prospect' : 'Add prospect'}</h2>
        <div className="prospects-grid">
          <label>
            Trading name
            <input
              value={form.tradingName}
              onChange={(e) => field('tradingName', e.target.value)}
              required
            />
          </label>
          <label>
            Region
            <select value={form.region} onChange={(e) => field('region', e.target.value)}>
              <option value="">Select region</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(e) => field('phone', e.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => field('email', e.target.value)} />
          </label>
          <label>
            Website
            <input value={form.website} onChange={(e) => field('website', e.target.value)} />
          </label>
          <label>
            Campaign
            <select value={form.campaign} onChange={(e) => field('campaign', e.target.value)}>
              {CAMPAIGNS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Enterprise tier
            <select value={form.tier} onChange={(e) => field('tier', e.target.value)}>
              {TIERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Source
            <input
              value={form.source}
              onChange={(e) => field('source', e.target.value)}
              placeholder="NZBN, referral, directory…"
            />
          </label>
          <label>
            Last contacted
            <input
              type="date"
              value={form.lastContacted}
              onChange={(e) => field('lastContacted', e.target.value)}
            />
          </label>
          <label className="prospects-span">
            Notes
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => field('notes', e.target.value)}
            />
          </label>
        </div>
        <div className="prospects-actions">
          <button type="submit" className="cta-primary">
            {form.id ? 'Save changes' : 'Add to list'}
          </button>
          {form.id ? (
            <button type="button" className="cta-secondary" onClick={() => setForm(EMPTY_FORM)}>
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="prospects-toolbar prospects-no-print">
        <input
          className="prospects-search"
          placeholder="Search name, phone, notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={filterCampaign} onChange={(e) => setFilterCampaign(e.target.value)}>
          <option value="">All campaigns</option>
          {CAMPAIGNS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)}>
          <option value="">All tiers</option>
          {TIERS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="button" className="cta-secondary" onClick={exportCsv}>
          Export CSV
        </button>
        <button type="button" className="cta-secondary" onClick={downloadTemplate}>
          CSV template
        </button>
        <label className="cta-secondary prospects-file-btn">
          Import CSV
          <input
            type="file"
            accept=".csv,text/csv"
            hidden
            onChange={(e) => {
              importCsv(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </label>
        <button type="button" className="cta-secondary" onClick={() => window.print()}>
          Print call sheet
        </button>
      </div>

      {status ? <p className="prospects-status prospects-no-print">{status}</p> : null}

      <h2 className="prospects-print-title">Pro Screen Australia — call sheet</h2>
      <p className="prospects-count">
        Showing {filtered.length} of {prospects.length} on this machine
      </p>

      <div className="prospects-table-wrap">
        <table className="prospects-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Campaign</th>
              <th>Tier</th>
              <th>Region</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Last contacted</th>
              <th>Notes</th>
              <th className="prospects-no-print"> </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9}>No rows yet. Add one above or import a CSV.</td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.tradingName}</strong>
                    {row.website ? (
                      <>
                        <br />
                        <a href={row.website.startsWith('http') ? row.website : `https://${row.website}`} target="_blank" rel="noreferrer">
                          {row.website}
                        </a>
                      </>
                    ) : null}
                  </td>
                  <td>{campaignLabel(row.campaign)}</td>
                  <td>{tierLabel(row.tier)}</td>
                  <td>{row.region}</td>
                  <td>{row.phone ? <a href={`tel:${row.phone.replace(/\s/g, '')}`}>{row.phone}</a> : ''}</td>
                  <td>{row.email}</td>
                  <td>{row.lastContacted}</td>
                  <td>{row.notes}</td>
                  <td className="prospects-no-print">
                    <button type="button" className="prospects-link-btn" onClick={() => editRow(row)}>
                      Edit
                    </button>
                    <button type="button" className="prospects-link-btn" onClick={() => deleteRow(row.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
