// BudgetUtils — namespace object holding small pure helpers used across the app
// (currency formatting and YYYY-MM month parsing / formatting).
// (e.g. BudgetUtils.formatCZK(amount)).

export const BudgetUtils = {
  /** Format integer amount as Czech currency: 1234 → "1 234 Kč" */
  formatCZK(amount) {
    return `${amount.toLocaleString('cs-CZ')} Kč`
  },

  /** Parse "YYYY-MM" string into [year, month] as numbers. */
  parseMonth(ym) {
    return ym.split('-').map(Number)
  },

  /** Format a Date object into the "YYYY-MM" key used for LocalStorage. */
  toMonthKey(date) {
    const year  = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  },

  /** Format "YYYY-MM" into a human-readable label (e.g. "May 2026"). */
  formatMonth(ym) {
    const [year, month] = BudgetUtils.parseMonth(ym)
    return new Date(year, month - 1).toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  },
}