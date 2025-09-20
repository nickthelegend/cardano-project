export const theme = {
  colors: {
    background: "#0E0E0E",
    text: "#FFFFFF",
    primary: "#63db9b",
    secondary: "#ff49d2",
    accent: "#e2e361",
    muted: "#333333",
    border: "#2A2A2A",
    success: "#63db9b",
    warning: "#e2e361",
    error: "#ff49d2",
  },
  fonts: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "50%",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  },
}

export type Theme = typeof theme
