// Exporter class hierarchy — handles serializing transactions to a file and triggering download.
// Abstract base + two concrete subclasses (JSON, CSV). Demonstrates prototype inheritance
// and the Template Method pattern (download() defines the algorithm, subclasses override the steps).

// Abstract base — must not be instantiated directly. All shared logic lives here.
class Exporter {
  // Subclasses must override these — base implementation throws to enforce override.
  get mime()      { throw new Error('Exporter.mime must be implemented by subclass') }
  get extension() { throw new Error('Exporter.extension must be implemented by subclass') }
  serialize(transactions) { throw new Error('Exporter.serialize() must be implemented by subclass') }

  // Template method — same flow for every format:
  // serialize → wrap in Blob → create object URL → trigger anchor download → cleanup.
  download(transactions, basename) {
    const content = this.serialize(transactions)
    const blob = new Blob([content], { type: this.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${basename}.${this.extension}`
    a.click()
    URL.revokeObjectURL(url)
  }
}

// JSON variant — pretty-printed (indent 2) for human inspection of the backup.
export class JSONExporter extends Exporter {
  get mime() { return 'application/json' }
  get extension() { return 'json' }

  serialize(transactions) {
    return JSON.stringify(transactions, null, 2)
  }
}

// CSV variant — escapes commas / quotes / newlines and prefixes a BOM so Excel
// opens the file as UTF-8 (otherwise Czech characters render incorrectly).
export class CSVExporter extends Exporter {
  get mime() { return 'text/csv;charset=utf-8' }
  get extension() { return 'csv' }

  serialize(transactions) {
    const header = ['id', 'type', 'name', 'category', 'amount']
    // Wrap a field in quotes if it contains a comma, quote, or newline.
    // Internal quotes are doubled per RFC 4180.
    const escape = (value) => {
      const s = String(value)
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const rows = transactions.map(t =>
      [t.id, t.type, t.name, t.category, t.amount].map(escape).join(',')
    )
    return '\uFEFF' + [header.join(','), ...rows].join('\n')
  }
}