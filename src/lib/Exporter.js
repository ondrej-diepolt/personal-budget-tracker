class Exporter {
  get mime()      { throw new Error('Exporter.mime must be implemented by subclass') }
  get extension() { throw new Error('Exporter.extension must be implemented by subclass') }
  serialize(transactions) { throw new Error('Exporter.serialize() must be implemented by subclass') }

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

export class JSONExporter extends Exporter {
  get mime() { return 'application/json' }
  get extension() { return 'json' }

  serialize(transactions) {
    return JSON.stringify(transactions, null, 2)
  }
}

export class CSVExporter extends Exporter {
  get mime() { return 'text/csv;charset=utf-8' }
  get extension() { return 'csv' }

  serialize(transactions) {
    const header = ['id', 'type', 'name', 'category', 'amount']
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