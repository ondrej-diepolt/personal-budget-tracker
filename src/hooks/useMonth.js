// useMonth — owns the "currently selected month" state and its navigation.
// All date arithmetic is delegated to the BudgetUtils namespace.
import { useState } from "react";
import { BudgetUtils } from "../lib/BudgetUtils";

export function useMonth() {
  // Initialize with the current real-world month (e.g. "2026-05").
  const [currentMonth, setCurrentMonth] = useState(
    BudgetUtils.toMonthKey(new Date())
  );

  // Step one month back. new Date(year, month - 2) — JS Date months are 0-indexed.
  function prevMonth() {
    setCurrentMonth((prev) => {
      const [year, month] = BudgetUtils.parseMonth(prev);
      return BudgetUtils.toMonthKey(new Date(year, month - 2));
    });
  }

  // Step one month forward.
  function nextMonth() {
    setCurrentMonth((prev) => {
      const [year, month] = BudgetUtils.parseMonth(prev);
      return BudgetUtils.toMonthKey(new Date(year, month));
    });
  }

  // Format for display in the UI (e.g. "May 2026").
  function formatLabel(ym) {
    return BudgetUtils.formatMonth(ym);
  }

  return { currentMonth, prevMonth, nextMonth, formatLabel };
}