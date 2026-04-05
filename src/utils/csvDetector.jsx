import { csvConfig } from "../config/csvConfig";

export const detectColumns = (csvData) => {
  const headers = csvData[0];
  const dataRows = csvData
    .slice(1)
    .filter((row) => row.some((cell) => cell && cell.trim()));
  const totalRows = dataRows.length;

  return headers.map((header, index) => {
    const headerLower = header.toLowerCase();

    // Force IGNORE for columns that match known non-data keywords
    if (
      csvConfig.ignoreKeywords.some((k) =>
        headerLower.includes(k.toLowerCase()),
      )
    ) {
      return {
        index,
        header,
        detectedType: "UNKNOWN",
        confidence: 0,
        detectedVocabulary: [],
        sampleValues: [],
      };
    }

    const cellValues = dataRows
      .map((row) => row[index])
      .filter((v) => v && v.trim());

    const uniqueValues = [...new Set(cellValues)];
    const uniqueRatio = totalRows > 0 ? uniqueValues.length / totalRows : 0;
    const avgLength =
      cellValues.length > 0
        ? cellValues.reduce((sum, v) => sum + v.length, 0) / cellValues.length
        : 0;
    const allNumeric =
      cellValues.length > 0 && cellValues.every((v) => !isNaN(Number(v)));

    let detectedType = "UNKNOWN";
    let confidence = 0;

    // Base type detection by value diversity
    if (uniqueValues.length <= 10 && uniqueRatio < 0.4) {
      detectedType = "PIE_CHART";
      confidence += uniqueValues.length <= 6 ? 0.3 : 0.1;
    } else if (avgLength > 15 || uniqueRatio > 0.6) {
      detectedType = "COMMENT";
      confidence += avgLength > 15 ? 0.3 : 0.2;
    }

    // Keyword boosting (overrides base detection if keyword matches)
    if (csvConfig.chartKeywords.some((k) => header.includes(k))) {
      detectedType = "PIE_CHART";
      confidence += 0.4;
    } else if (csvConfig.commentKeywords.some((k) => header.includes(k))) {
      detectedType = "COMMENT";
      confidence += 0.4;
    }

    // Additional confidence signals
    if (allNumeric && detectedType === "PIE_CHART") confidence += 0.2;
    if (uniqueRatio > 0.7 && detectedType === "COMMENT") confidence += 0.3;

    confidence = Math.min(1, confidence);

    // If evidence is weak, surface as UNKNOWN for the user to decide
    if (confidence < 0.5) detectedType = "UNKNOWN";

    return {
      index,
      header,
      detectedType,
      confidence,
      detectedVocabulary: detectedType === "PIE_CHART" ? uniqueValues : [],
      sampleValues: cellValues.slice(0, 5),
    };
  });
};
