import { csvConfig } from "../config/csvConfig";

// ─── Phase 1: keyword-based parsing ─────────────────────────────────────────

export const processCsvData = (csvData) => {
  const headers = csvData[0];
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = csvData.length - 1; // BUG FIX: exclude header row

  for (let i = 0; i < headers.length; i++) {
    if (csvConfig.chartKeywords.some((k) => headers[i].includes(k))) {
      chartHeaders.push(headers[i]);
      chartData.push(createChartData(csvData, i));
    }
    if (csvConfig.commentKeywords.some((k) => headers[i].includes(k))) {
      commentHeaders.push(headers[i]);
      commentData.push(extractComments(csvData, i));
    }
  }

  // BUG FIX: totalFeedback returned once from here, not set inside the loop
  return {
    chartHeaders,
    chartData,
    commentHeaders,
    commentData,
    totalFeedback,
  };
};

export const createChartData = (csvData, columnIndex) => {
  const feedbackCounts = {};
  csvConfig.defaultFeedbackVocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  // BUG FIX: start at i=1 to skip the header row
  for (let i = 1; i < csvData.length; i++) {
    const feedback = csvData[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractComments = (csvData, columnIndex) => {
  const noiseFilters = csvConfig.commentNoiseFilters;
  return csvData
    .slice(1) // skip header row
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase()),
    );
};

// ─── Phase 2: mapping-based parsing ─────────────────────────────────────────

export const processCsvDataWithMapping = (csvData, columnMapping) => {
  const chartHeaders = [];
  const chartData = [];
  const commentHeaders = [];
  const commentData = [];
  const totalFeedback = csvData.length - 1;

  for (const col of columnMapping) {
    if (col.type === "PIE_CHART") {
      chartHeaders.push(col.header);
      chartData.push(
        createChartDataWithVocab(csvData, col.index, col.vocabulary),
      );
    } else if (col.type === "COMMENT") {
      commentHeaders.push(col.header);
      commentData.push(
        extractCommentsWithFilters(csvData, col.index, col.noiseFilters),
      );
    }
  }

  return {
    chartHeaders,
    chartData,
    commentHeaders,
    commentData,
    totalFeedback,
  };
};

export const createChartDataWithVocab = (csvData, columnIndex, vocabulary) => {
  const feedbackCounts = {};
  vocabulary.forEach((v) => {
    feedbackCounts[v] = 0;
  });

  for (let i = 1; i < csvData.length; i++) {
    const feedback = csvData[i][columnIndex];
    if (Object.prototype.hasOwnProperty.call(feedbackCounts, feedback)) {
      feedbackCounts[feedback]++;
    }
  }

  return Object.entries(feedbackCounts)
    .filter(([, count]) => count > 0)
    .map(([feedback, count]) => ({ feedback, count }));
};

export const extractCommentsWithFilters = (
  csvData,
  columnIndex,
  noiseFilters,
) => {
  return csvData
    .slice(1)
    .map((row) => row[columnIndex])
    .filter(
      (comment) =>
        comment &&
        comment.trim() &&
        !noiseFilters.includes(comment.trim().toLowerCase()),
    );
};
