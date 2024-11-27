export const MODIFIER_STYLES: { [key: string]: React.CSSProperties } = {
  selected: { background: "blue" },
  unavailable: { backgroundColor: "red", cursor: "not-allowed" },
  partiallyUnavailable: { backgroundColor: "orange" },
  past: { opacity: 0.2, cursor: "not-allowed" },
};

export const STYLES: { [key: string]: React.CSSProperties } = {
  months: { fontSize: "2rem" },
  caption: { fontSize: "1.2rem" },
  caption_label: { fontSize: "1.2rem", padding: "1rem" },
  table: { width: "100%", borderSpacing: "0.5rem" },
  head_cell: { width: "4rem", height: "4rem", fontSize: "1rem" },
  cell: { width: "4rem", height: "4rem" },
  day: { width: "4rem", height: "4rem", fontSize: "1.2rem" },
  nav_button_previous: { width: "4rem", height: "4rem" },
  nav_button_next: { width: "4rem", height: "4rem" },
};
