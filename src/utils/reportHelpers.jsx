// Only strip genuine control characters that would corrupt the PDF stream.
// Everything else (emoji, Unicode, special chars) is handled by the registered
// NotoSans font + Twemoji emoji source in ReportDocument.
export const sanitizePdfText = (text) => {
  if (text == null) return "";
  // Remove control chars except tab (\x09) and newline (\x0A)
  return String(text)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
};

export const interpolateTitle = (
  template,
  { courseName, moduleName, faculty, batchMonth, batchYear, moduleco },
) => {
  return template
    .replace("{courseName}", courseName || "")
    .replace("{moduleName}", moduleName || "")
    .replace("{faculty}", faculty || "")
    .replace("{batchMonth}", batchMonth || "")
    .replace("{batchYear}", batchYear || "")
    .replace("{moduleco}", moduleco || "")
    .replace(/\s+/g, " ")
    .trim();
};
