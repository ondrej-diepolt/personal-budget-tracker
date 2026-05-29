// Importer class hierarchy — handles reading a file, parsing it, and validating the contents.
// Mirror image of the Exporter hierarchy: abstract base + JSON / CSV subclasses.
// The shared validate() and import() (template method) live on the base.

class Importer {
  // Promise wrapper around the callback-based FileReader API — shared by all subclasses.
  read(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload  = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  // Subclasses must implement format-specific parsing.
  parse(text) { throw new Error('Importer.parse() must be implemented by subclass') }

  // Common validation — returns { valid, errors }. Rows with bad shape are skipped, not thrown.
  validate(rows) {
    const valid  = []
    const errors = []

    rows.forEach((row, i) => {
      if (!row || typeof row !== 'object') {
        errors.push({ row: i, reason: 'not an object' }); return
      }
      const id     = Number(row.id)
      const amount = Number(row.amount)

      if (!Number.isFinite(id) || id < 1) {
        errors.push({ row: i, reason: 'invalid id' }); return
      }
      if (!['Income', 'Expense'].includes(row.type)) {
        errors.push({ row: i, reason: 'invalid type' }); return
      }
      if (typeof row.name !== 'string' || !row.name.trim()) {
        errors.push({ row: i, reason: 'invalid name' }); return
      }
      if (typeof row.category !== 'string' || !row.category.trim()) {
        errors.push({ row: i, reason: 'invalid category' }); return
      }
      if (!Number.isFinite(amount) || amount < 0) {
        errors.push({ row: i, reason: 'invalid amount' }); return
      }

      valid.push({ id, type: row.type, name: row.name, category: row.category, amount })
    })

    return { valid, errors }
  }

  // Template method — read → parse → validate. Same flow for every format.
  async import(file) {
    const text   = await this.read(file)
    const parsed = this.parse(text)
    return this.validate(parsed)
  }
}

// JSON variant — parses with JSON.parse and verifies the top-level is an array.
export class JSONImporter extends Importer {
  parse(text) {
    const data = JSON.parse(text)
    if (!Array.isArray(data)) throw new Error('Expected JSON array')
    return data
  }
}

// CSV variant — strips BOM, splits lines, maps each line into an object keyed by the header.
export class CSVImporter extends Importer {
  parse(text) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1)   // strip UTF-8 BOM if present

    const lines = text.split('\n').map(l => l.replace(/\r$/, '')).filter(Boolean)
    if (lines.length < 2) return []

    const header = this.parseRow(lines[0])
    return lines.slice(1).map(line => {
      const values = this.parseRow(line)
      const obj = {}
      header.forEach((key, i) => { obj[key] = values[i] })
      return obj
    })
  }

  // Mini CSV row parser — handles quoted fields with commas and escaped quotes ("").
  // Walks the row one character at a time, tracking whether we are inside a quoted field.
  parseRow(row) {
    const result = []
    let current  = ''
    let inQuotes = false
    let i = 0
    while (i < row.length) {
      const ch = row[i]
      if (inQuotes) {
        if (ch === '"' && row[i+1] === '"') { current += '"'; i += 2 }
        else if (ch === '"') { inQuotes = false; i++ }
        else { current += ch; i++ }
      } else {
        if (ch === '"') { inQuotes = true; i++ }
        else if (ch === ',') { result.push(current); current = ''; i++ }
        else { current += ch; i++ }
      }
    }
    result.push(current)
    return result
  }
}