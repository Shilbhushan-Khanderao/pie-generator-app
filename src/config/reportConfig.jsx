const REPORT_CONFIG_KEY = "pie_generator_report_config";

export const getReportConfig = () => {
  try {
    const stored = localStorage.getItem(REPORT_CONFIG_KEY);
    if (!stored) return reportConfig;
    return { ...reportConfig, ...JSON.parse(stored) };
  } catch {
    return reportConfig;
  }
};

export const reportConfig = {
  pageSize: "A4",
  pageOrientation: "portrait",
  titleTemplate: "{courseName} Module Feedback Report - {moduleName}",
  sectionOrder: ["charts", "comments"],
  chartsPerRow: 2,
  // Fallback palette when a value has no semantic colour match
  chartColors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D733FF"],
  showTotalCount: true,
  footerText: "© C-DAC Mumbai (Education & Training Team)",
  logoPath: "/CDAC-KH.png",
};

// Semantic colour map — keyed by lowercase feedback value.
// One true green (excellent/normal), then each level shifts to a clearly different hue:
//   cyan → amber-gold → deep orange → red.  No two adjacent levels share a hue family.
export const feedbackColors = {
  // Quality / satisfaction
  excellent: "#43a047", // medium green   — clearly best
  "very good": "#00acc1", // cyan / teal    — positive, distinct from green
  good: "#ffb300", // amber gold     — neutral-warm
  average: "#ff7043", // deep orange    — below average
  poor: "#e53935", // red            — worst
  // Pace (green = ideal pace; blues = too fast; warm = too slow)
  normal: "#43a047", // green  — ideal
  fast: "#29b6f6", // sky blue
  "very fast": "#1565c0", // deep blue
  slow: "#ff9800", // orange
  "very slow": "#d32f2f", // deep red
};
