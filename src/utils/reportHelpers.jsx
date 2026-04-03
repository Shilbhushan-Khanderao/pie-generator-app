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
