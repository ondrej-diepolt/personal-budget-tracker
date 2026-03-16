import { useState } from "react";

export function useMonth() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
  );

  function prevMonth() {
    setCurrentMonth((prev) => {
      const [year, month] = prev.split("-").map(Number);
      const date = new Date(year, month - 2);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    });
  }

  function nextMonth() {
    setCurrentMonth((prev) => {
      const [year, month] = prev.split("-").map(Number);
      const date = new Date(year, month);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    });
  }

  function formatLabel(ym) {
    const [year, month] = ym.split("-").map(Number);
    return new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return { currentMonth, prevMonth, nextMonth, formatLabel };
}
